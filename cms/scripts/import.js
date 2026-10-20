'use strict';

/*
 * Import content into Strapi from a JSON file and publish it.
 *
 *   npm run import -- path/to/content.json [path/to/media/folder] [--prune]
 *
 * The file maps content type UIDs to entries, for example:
 *   { "api::profile.profile": [{ "slug": "wole-soyinka", "fullName": "..." }],
 *     "api::home-page.home-page": { "welcomeTitle": "..." } }
 *
 * Collection entries are matched on slug (or title when there is no slug),
 * so running an import again updates entries instead of duplicating them.
 *
 * Media fields may hold {"$file": "relative/path.jpg", "alt": "..."}. The file
 * is read from the media folder, images are resized to at most 2000px, and
 * the upload is reused on later imports (matched on the relative path), with
 * its alternative text and caption updated from the file.
 *
 * --prune deletes entries of the imported collections that are not in the
 * file. Use it only when the file is the complete source for those collections.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { createStrapi, compileStrapi } = require('@strapi/strapi');

const MAX_IMAGE_SIZE = 2000;
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.mp3': 'audio/mpeg', '.pdf': 'application/pdf' };

function createUploader(app, mediaRoot) {
  const files = app.db.query('plugin::upload.file');
  const cache = new Map();

  async function upload(rel, alt) {
    if (cache.has(rel)) return cache.get(rel);
    const existing = await files.findOne({ where: { name: rel } });
    if (existing) {
      // keep captions in step with the content file
      if (alt && existing.alternativeText !== alt) {
        await files.update({ where: { id: existing.id }, data: { alternativeText: alt, caption: alt } });
      }
      cache.set(rel, existing.id);
      return existing.id;
    }
    if (!mediaRoot) throw new Error(`Media folder required to upload ${rel}`);

    let filepath = path.join(mediaRoot, rel);
    let mimetype = MIME[path.extname(rel).toLowerCase()];
    if (!mimetype) throw new Error(`Unsupported media type: ${rel}`);
    if (mimetype.startsWith('image/')) {
      const out = path.join(os.tmpdir(), `grier-${process.pid}-${cache.size}.jpg`);
      await sharp(filepath)
        .rotate()
        .resize(MAX_IMAGE_SIZE, MAX_IMAGE_SIZE, { fit: 'inside', withoutEnlargement: true })
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(out);
      filepath = out;
      mimetype = 'image/jpeg';
    }

    const [file] = await app.plugin('upload').service('upload').upload({
      data: { fileInfo: { name: rel, alternativeText: alt ?? null, caption: alt ?? null } },
      files: {
        filepath,
        originalFilename: path.basename(rel),
        mimetype,
        size: fs.statSync(filepath).size,
      },
    });
    cache.set(rel, file.id);
    return file.id;
  }

  /* Replace every {"$file": ...} in an entry with the uploaded file id. */
  return async function resolveMedia(value) {
    if (Array.isArray(value)) {
      const out = [];
      for (const item of value) out.push(await resolveMedia(item)); // one upload at a time
      return out;
    }
    if (value && typeof value === 'object') {
      if (value.$file) return upload(value.$file, value.alt);
      const out = {};
      for (const [key, inner] of Object.entries(value)) out[key] = await resolveMedia(inner);
      return out;
    }
    return value;
  };
}

const keyOf = (entry) => (entry.slug ? { slug: entry.slug } : { title: entry.title });

async function upsertCollection(app, uid, entries, resolveMedia, prune) {
  const docs = app.documents(uid);
  let created = 0;
  let updated = 0;
  let deleted = 0;
  for (const raw of entries) {
    const data = await resolveMedia(raw);
    const existing = await docs.findFirst({ filters: keyOf(data), status: 'draft' });
    if (existing) {
      await docs.update({ documentId: existing.documentId, data, status: 'published' });
      updated++;
    } else {
      await docs.create({ data, status: 'published' });
      created++;
    }
  }
  if (prune) {
    const wanted = new Set(entries.map((e) => JSON.stringify(keyOf(e))));
    for (const doc of await docs.findMany({ status: 'draft', limit: -1 })) {
      if (!wanted.has(JSON.stringify(keyOf(doc)))) {
        await docs.delete({ documentId: doc.documentId });
        deleted++;
      }
    }
  }
  return `${created} created, ${updated} updated` + (prune ? `, ${deleted} deleted` : '');
}

async function upsertSingle(app, uid, raw, resolveMedia) {
  const docs = app.documents(uid);
  const data = await resolveMedia(raw);
  const existing = await docs.findFirst({ status: 'draft' });
  if (existing) {
    await docs.update({ documentId: existing.documentId, data, status: 'published' });
    return 'updated';
  }
  await docs.create({ data, status: 'published' });
  return 'created';
}

async function main() {
  const args = process.argv.slice(2);
  const [file, mediaRoot] = args.filter((a) => !a.startsWith('--'));
  const prune = args.includes('--prune');
  if (!file) {
    console.error('Usage: npm run import -- path/to/content.json [path/to/media/folder] [--prune]');
    process.exit(1);
  }
  const payload = JSON.parse(fs.readFileSync(file, 'utf8'));

  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  const resolveMedia = createUploader(app, mediaRoot);

  try {
    for (const [uid, value] of Object.entries(payload)) {
      const contentType = app.contentTypes[uid];
      if (!contentType) throw new Error(`Unknown content type: ${uid}`);
      const result =
        contentType.kind === 'singleType'
          ? await upsertSingle(app, uid, value, resolveMedia)
          : await upsertCollection(app, uid, value, resolveMedia, prune);
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
