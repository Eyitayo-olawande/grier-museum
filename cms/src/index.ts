import type { Core } from '@strapi/strapi';

/* The public website reads published content at build time, so the Public
   role needs read access to every content type. Granting it here keeps a
   fresh database (development or production) working without manual setup. */
async function grantPublicReadAccess(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const wanted = Object.entries(strapi.contentTypes)
    .filter(([uid]) => uid.startsWith('api::'))
    .flatMap(([uid, ct]) =>
      ct.kind === 'singleType' ? [`${uid}.find`] : [`${uid}.find`, `${uid}.findOne`]
    );

  const permissions = strapi.db.query('plugin::users-permissions.permission');
  const existing = await permissions.findMany({ where: { role: publicRole.id }, select: ['action'] });
  const have = new Set(existing.map((p: { action: string }) => p.action));

  for (const action of wanted.filter((a) => !have.has(a))) {
    await permissions.create({ data: { action, role: publicRole.id } });
  }
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await grantPublicReadAccess(strapi);
  },
};
