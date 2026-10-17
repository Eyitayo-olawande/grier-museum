# Grier House Museum & Library

Website for griermuseum.org: home of the Grier House Museum & Library, custodian of the history and traditions of Grier House, Government College Ibadan.

## Structure

| Folder | What it is |
|---|---|
| `src/` | Next.js 16 website, exported as static pages (`out/`) |
| `src/lib/content.ts` | Where pages get their content: Strapi when `STRAPI_URL` is set, otherwise the local files in `src/data/` |
| `cms/` | Strapi 5 Content Management System (content types, admin panel, import script) |
| `docs/design/template_d.html` | Approved Template D (profile page design) |

## Development

Requires Node 20 or later.

### Website only (local data files)

```bash
npm install
npm run dev
```

### Website with the Content Management System

1. Start Strapi (first run asks you to create an administrator at http://localhost:1337/admin):

   ```bash
   cd cms
   npm install
   cp .env.example .env   # first time only, then replace the "tobemodified" secrets
   npm run develop
   ```

2. In another terminal, run the website against it:

   ```bash
   STRAPI_URL=http://localhost:1337 npm run dev
   ```

The website reads published entries only. Drafts stay invisible until they are published in the admin panel.

### Content from the Google Drive folder

`content/content.json` holds all site content (profiles, History, Traditions, Dare to Learn excerpts, Extracurricular Activities, archive captions, Home and Museum text). It is generated from the client's Google Drive export:

```bash
python3 -I content/build_content.py "/path/to/GRIER-HOUSE-MUSEUM/CONTENT"
```

- Text is kept as written by the Grier History and Traditions Committee.
- Profile chips (fields, achievements, distinctions) and portrait choices are in `content/profiles_meta.py` and `PORTRAITS` in the build script, drawn only from facts in each profile document.
- Without Strapi, the website reads this file directly (text only, no photos).

### Importing into Strapi

```bash
cd cms
npm run import -- ../content/content.json "/path/to/GRIER-HOUSE-MUSEUM/CONTENT"
```

- Entries are matched on `slug` (or `title`), so imports can be rerun safely.
- Photos and videos referenced as `{"$file": ...}` are uploaded from the Drive folder; images are resized to at most 2000px. Files already uploaded are reused, so a rerun takes about a minute.
- Add `--prune` to delete entries of the imported collections that are not in the file. Do not use it once editors have added content directly in Strapi.

## Content types

Notable Griersons (profiles), Articles (History, News & Publications), Timeline Events, Traditions, Archive Items, Extracurricular Activities, Mustard Seed Issues, Dare to Learn excerpts and book page, Newsletter Issues, From the Desk of the House Governor, Stories of Griersons, Home Page, Museum & Library Page.

## Build

```bash
npm run build            # local data
STRAPI_URL=... npm run build   # from Strapi; fails if Strapi cannot be reached
```

Deployment (Render static site, Strapi on Render with PostgreSQL, media on Cloudflare R2) is configured in a later phase.
