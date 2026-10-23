# Handover: Grier House Museum & Library website

Status as of 23 October 2026. Read this first when continuing on another machine or in a new session.

## Where things are

| What | Where |
|---|---|
| Code | GitHub `Eyitayo-olawande/grier-museum`, branch **`phase-a-strapi`** (not yet merged into `main`; `main` still holds the 26 September work) |
| Client content (Drive export plus files added from WhatsApp) | `CONTENT/` folder beside the repo. **Not in git and not all in Google Drive.** Move it with the transfer package. |
| Strapi database and uploads | `cms/.tmp/data.db`, `cms/public/uploads/`, `cms/.env` (secrets). Not in git. Optional to move; can be rebuilt with the import. |
| Approved profile design | `docs/design/template_d.html` |
| Wording not written by the committee, for their review | `docs/content-review.md` |

## How the site is built

- **Website:** Next.js 16, static export (`npm run build` gives `out/`).
- **Content Management System:** Strapi 5 in `cms/` (SQLite locally, PostgreSQL planned for production).
- **Content pipeline:** `content/build_content.py` reads the `CONTENT/` folder and writes `content/content.json`. `cms/scripts/import.js` loads that file and the media into Strapi. Without `STRAPI_URL` the site reads `content.json` directly, as text only.
- **Committee text not in Drive:** `content/sources/` (donation appeal, contact details, artworks).
- **Profile chips and portrait choices:** `content/profiles_meta.py` and `PORTRAITS` in the build script.

## Setting up on a new machine

Needs Node 20 or later, Python 3, and the `textutil` command (built into macOS).

```bash
git clone git@github.com:Eyitayo-olawande/grier-museum.git
cd grier-museum
git checkout phase-a-strapi
npm install
cd cms && npm install && cd ..
```

Put the `CONTENT` folder beside the repo, so the layout is `GRIER-HOUSE-MUSEUM/CONTENT` and `GRIER-HOUSE-MUSEUM/grier-museum`.

Then either:

- **Restore the Strapi data from the transfer package:** copy `data.db` to `cms/.tmp/`, the `uploads` folder to `cms/public/uploads/`, and `.env` to `cms/.env`. Your existing admin login works.
- **Or start fresh:** `cp cms/.env.example cms/.env`, replace the `tobemodified` secrets, run `npm run develop` in `cms` once and create an admin at http://localhost:1337/admin. Then run the import (about 16 minutes the first time):

  ```bash
  cd cms && npm run import -- ../content/content.json "../../CONTENT"
  ```

## Running it

Terminal 1:

```bash
cd cms && npm run develop
```

Terminal 2 (port 3001 because 3000 was taken on the original machine):

```bash
STRAPI_URL=http://localhost:1337 npm run dev -- -p 3001
```

Website: http://localhost:3001. Strapi admin: http://localhost:1337/admin.

## After adding or changing content in the CONTENT folder

```bash
python3 -I content/build_content.py "../CONTENT"
cd cms && npm run import -- ../content/content.json "../../CONTENT"
```

Add `--prune` only while the content file is the complete source (before editors work directly in Strapi).

## Ground rules agreed with the client

- **Committee text is used as written.** Only obvious typing slips are corrected. Abbreviations such as GCI stay as the committee wrote them.
- **Never invent content.** Anything not supplied is marked "to be confirmed" and listed in `docs/content-review.md`.
- **Images come from the Museum's own collection** and are shown whole, never cropped.
- **Founding dates:** Government College Ibadan was founded in 1929 and Grier House in 1930.
- **Menu:** the menu label is "Notable Griersons". The main menu is bold, mixed case, on one row from 1240px wide, with a labelled Menu button below that width.
- **Contacts:** admin@ (Kenny Oladipo, Webpage Manager), museum@ (Dr. Dele Olusanya and Yemi Adegoke), editor@ (Oladele Jegede). No phone numbers.
- **Dare to Learn** is "book in press", with no purchase links yet.

## Waiting on the committee

- **Video descriptions:** for the two September 2026 archive videos (Yemi Adegoke).
- **Soyinka interview:** the date (the note says "August 1967 … after release", but he was released in October 1969) and the source or rights of the footage.
- **Choir recording:** performers and date.
- **Grier House Chess Club:** a description.
- **Artworks:** subject names and artists for the works marked "to be confirmed".
- **Portraits:** for Ajomale, Arubayi, Beckley, Ogunmoyela, Onajin and Sagay (on hold at the committee's request).
- **Photo caption:** "Otegbeye 1942.png" shows an older man; check the name or year.
- **Second museum tour video:** coming; name it starting "Introductory video" in `CONTENT/Museum & Library /`.
- **New archive photos and videos:** in Google Drive, not yet downloaded.
- **Bank details:** to be confirmed by the chairman before launch.
- **Email mailboxes:** admin@, museum@ and editor@griermuseum.org are not set up yet. The contact form needs a recipient (suggested: admin@).

## Next steps

1. Open a pull request from `phase-a-strapi` into `main`.
2. Deploy (Phase E). The website is a free Render static site; Strapi is a Render web service on the 2 GB plan ($25) with Render PostgreSQL ($6). Media goes on Cloudflare R2 (free; the quote named Cloudinary, whose free plan counts video viewing). Domain DNS stays on Namecheap until deployment. The client was quoted $40/month (this setup comes to about $31).
3. Remaining leftovers from the earlier build: the Traditions "Share a Grier House Tradition" box, five hero subtitles and the contact form's enquiry options (see `docs/content-review.md`).
