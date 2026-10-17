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

### Importing content

```bash
cd cms
npm run import -- path/to/content.json
```

The file maps content type identifiers (for example `api::profile.profile`) to entries. Entries are matched on `slug` (or `title`), so imports can be rerun safely.

## Content types

Notable Griersons (profiles), Articles (History, News & Publications), Timeline Events, Traditions, Archive Items, Extracurricular Activities, Mustard Seed Issues, Dare to Learn excerpts and book page, Newsletter Issues, From the Desk of the House Governor, Stories of Griersons, Home Page, Museum & Library Page.

## Build

```bash
npm run build            # local data
STRAPI_URL=... npm run build   # from Strapi; fails if Strapi cannot be reached
```

Deployment (Render static site, Strapi on Render with PostgreSQL, media on Cloudflare R2) is configured in a later phase.
