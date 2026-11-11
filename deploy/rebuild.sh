#!/usr/bin/env bash
# Rebuild the Next.js static site and deploy it to the nginx web root.
# Runs on the server — triggered by the webhook server or manually.
#
# Manual run: bash /var/www/grier-museum/deploy/rebuild.sh
set -euo pipefail

APP_DIR="/var/www/grier-museum"
WEB_ROOT="/var/www/griermuseum.org/html"
ENV_FILE="$APP_DIR/.env.local"
LOG="/var/log/pm2/rebuild.log"

exec >> "$LOG" 2>&1
echo ""
echo "===== Rebuild started: $(date) ====="

# --- 1. Pull latest code ---
echo "--> git pull"
git -C "$APP_DIR" pull --ff-only origin phase-a-strapi

# --- 2. Install any new dependencies ---
echo "--> npm ci (root)"
cd "$APP_DIR"
npm ci --prefer-offline

# --- 3. Build the Next.js static export ---
# .env.local must contain:
#   STRAPI_URL=https://cms.griermuseum.org
#   STRAPI_TOKEN=<token from production Strapi admin>
echo "--> next build"
# Cap memory so the build doesn't OOM on the 1 GB droplet
NODE_OPTIONS="--max_old_space_size=512" \
  $(grep -v '^#' "$ENV_FILE" | xargs) \
  npm run build

# --- 4. Swap the static files into the web root atomically ---
echo "--> deploy to $WEB_ROOT"
# Build wrote to out/; rsync into web root
rsync -a --delete "$APP_DIR/out/" "$WEB_ROOT/"

echo "===== Rebuild finished: $(date) ====="
