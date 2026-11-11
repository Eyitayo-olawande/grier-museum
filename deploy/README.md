# Grier Museum — DigitalOcean Deployment Guide

**Server:** `134.209.27.242` (ubuntu-s-1vcpu-512mb-10gb-lon1 → resize to 1 GB before starting)  
**Branch:** `phase-a-strapi`  
**Architecture:** Strapi CMS (PM2) + nginx (static site + CMS proxy) + webhook rebuild

---

## How it works

```
Editor visits  cms.griermuseum.org/admin
  └─► nginx proxies to Strapi (port 1337)
  └─► Editor publishes content
  └─► Strapi fires a webhook → webhook-server.js (port 9000)
  └─► rebuild.sh runs (~60s)
        git pull
        npm run build  (fetches content from Strapi)
        rsync out/ → /var/www/griermuseum.org/html/
  └─► Visitors see updated site at griermuseum.org
```

---

## Before you begin

### 1. Resize the Droplet to 1 GB RAM
In DigitalOcean → Droplet → Resize → select the 1 GB / 25 GB plan.
This is done online; the data is preserved.

### 2. Point DNS to the Droplet
Add these A records at your DNS provider (TTL: 300):

| Hostname              | Type | Value           |
|-----------------------|------|-----------------|
| `griermuseum.org`     | A    | 134.209.27.242  |
| `www.griermuseum.org` | A    | 134.209.27.242  |
| `cms.griermuseum.org` | A    | 134.209.27.242  |

Wait for them to propagate before running step 5.

### 3. Get your local Strapi secrets
On your Mac, open `cms/.env` and copy these values — you'll need them in step 4b:
- `APP_KEYS`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

---

## Deployment steps

### Step 1 — Server setup (run on Droplet as root)

```bash
ssh root@134.209.27.242
```

Upload and run:
```bash
# From your Mac
scp deploy/01-server-setup.sh root@134.209.27.242:/root/
ssh root@134.209.27.242 bash /root/01-server-setup.sh
```

This installs Node.js 20, PM2, nginx, clones the repo, and builds the Strapi admin panel.

---

### Step 2 — Migrate database and media (run on your Mac)

```bash
bash deploy/02-migrate-data.sh
```

Copies `cms/.tmp/data.db` and `cms/public/uploads/` to the server.

---

### Step 3 — Create environment files on the server

SSH into the server and create two files:

#### a) Strapi production env
```bash
nano /var/www/grier-museum/cms/.env
```

Fill in using `deploy/.env.cms.example` as the template.
Paste in your secret values from step 3 above. The only change from local is:
```
PUBLIC_URL=https://cms.griermuseum.org
```

#### b) Next.js build env
```bash
nano /var/www/grier-museum/.env.local
```

Content:
```
STRAPI_URL=https://cms.griermuseum.org
STRAPI_TOKEN=PLACEHOLDER_UPDATE_AFTER_STEP_6
```

(You'll come back and update `STRAPI_TOKEN` in step 6.)

---

### Step 4 — Set your webhook secret

Edit `deploy/ecosystem.config.js` on the server and replace `REPLACE_WITH_A_STRONG_RANDOM_SECRET`
with a real secret. You can generate one:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Write it down — you'll enter the same value in Strapi's webhook config (step 7).

---

### Step 5 — Start services, configure nginx, get SSL

DNS must be live before running this.

```bash
ssh root@134.209.27.242
bash /var/www/grier-museum/deploy/03-start-services.sh
```

This:
- Copies nginx configs and reloads nginx
- Runs certbot to get Let's Encrypt SSL for both domains
- Starts Strapi + webhook server via PM2
- Runs the first full site build

**Expected time: 3–5 minutes** (Strapi needs ~30s to start before the build begins).
If the build fails because Strapi isn't ready yet, wait 60s then run:
```bash
bash /var/www/grier-museum/deploy/rebuild.sh
```

---

### Step 6 — Get the production Strapi API token

1. Visit `https://cms.griermuseum.org/admin`
2. Log in with your existing admin credentials
3. Go to **Settings → API Tokens → Create new API token**
   - Name: `Next.js build`
   - Type: **Read-only**
   - Duration: Unlimited
4. Copy the token

Update the build env file on the server:
```bash
nano /var/www/grier-museum/.env.local
# Replace PLACEHOLDER_UPDATE_AFTER_STEP_6 with the token you just copied
```

Trigger a rebuild to confirm it works:
```bash
bash /var/www/grier-museum/deploy/rebuild.sh
```

---

### Step 7 — Configure the Strapi webhook

1. In the Strapi admin: **Settings → Webhooks → Add a webhook**
2. Fill in:
   - **Name:** `Site rebuild`
   - **URL:** `http://127.0.0.1:9000/rebuild`
   - **Headers:** `Authorization` = `Bearer <your-webhook-secret-from-step-4>`
   - **Events:** check `entry.publish`, `entry.unpublish`, `entry.update`, `entry.delete`, `media.create`, `media.update`, `media.delete`
3. Save, then click **Trigger** to test — the site should rebuild within 90 seconds

---

## Day-to-day operation

| Task | Command |
|------|---------|
| View PM2 processes | `pm2 list` |
| View rebuild log | `tail -f /var/log/pm2/rebuild.log` |
| View Strapi log | `pm2 logs strapi` |
| Manual rebuild | `bash /var/www/grier-museum/deploy/rebuild.sh` |
| Deploy code changes | `git push` on your Mac → then `bash rebuild.sh` on server |
| Restart Strapi | `pm2 restart strapi` |
| Check nginx | `nginx -t && systemctl reload nginx` |

---

## Giving editors CMS access

1. Log in to `https://cms.griermuseum.org/admin`
2. Go to **Settings → Users** (the admin Users, not the content Users)
3. **Invite** — enter the editor's email, assign the `Editor` role
4. They receive an email to set their password and can then log in

Content editors only see the content types they're allowed to edit — they cannot see API tokens, webhooks, or server settings.

---

## If the server runs out of memory during a build

Add a swap file (one-time):
```bash
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

This gives the Next.js build a 1 GB safety buffer without upgrading the Droplet.
