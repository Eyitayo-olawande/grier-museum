'use strict';

/*
 * Import content into Strapi from a JSON file and publish it.
 *
 *   npm run import -- path/to/content.json
 *
 * The file maps content type UIDs to entries, for example:
 *   { "api::profile.profile": [{ "slug": "wole-soyinka", "fullName": "..." }],
 *     "api::home-page.home-page": { "welcomeTitle": "..." } }
 *
 * Collection entries are matched on slug (or title when there is no slug),
 * so running an import again updates entries instead of duplicating them.
 */

const fs = require('fs');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

async function upsertCollection(app, uid, entries) {
  const docs = app.documents(uid);
  let created = 0;
  let updated = 0;
  for (const data of entries) {
    const filters = data.slug ? { slug: data.slug } : { title: data.title };
    const existing = await docs.findFirst({ filters, status: 'draft' });
    if (existing) {
      await docs.update({ documentId: existing.documentId, data, status: 'published' });
      updated++;
    } else {
      await docs.create({ data, status: 'published' });
      created++;
    }
  }
  return `${created} created, ${updated} updated`;
}

async function upsertSingle(app, uid, data) {
  const docs = app.documents(uid);
  const existing = await docs.findFirst({ status: 'draft' });
  if (existing) {
    await docs.update({ documentId: existing.documentId, data, status: 'published' });
    return 'updated';
  }
  await docs.create({ data, status: 'published' });
  return 'created';
}

async function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: npm run import -- path/to/content.json');
    process.exit(1);
  }
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'));

  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  try {
    for (const [uid, value] of Object.entries(payload)) {
      const contentType = app.contentTypes[uid];
      if (!contentType) throw new Error(`Unknown content type: ${uid}`);
      const result =
        contentType.kind === 'singleType'
          ? await upsertSingle(app, uid, value)
          : await upsertCollection(app, uid, value);
      console.log(`${uid}: ${result}`);
    }
  } finally {
    await app.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
