#!/usr/bin/env bash
# Run this script on your LOCAL Mac — it pushes the Strapi database
# and all uploaded media to the Droplet.
#
# Usage: bash deploy/02-migrate-data.sh
#
# Prerequisites:
#   - SSH access to the Droplet (ssh root@134.209.27.242 works)
#   - 01-server-setup.sh has already run on the Droplet
set -euo pipefail

SERVER="root@134.209.27.242"
APP_DIR="/var/www/grier-museum"
CMS_LOCAL="$(cd "$(dirname "$0")/.." && pwd)/cms"

echo "==> Stopping Strapi on the server (safe DB copy)"
ssh "$SERVER" "pm2 stop strapi 2>/dev/null || true"

echo "==> Copying Strapi SQLite database"
rsync -avz --progress \
  "$CMS_LOCAL/.tmp/data.db" \
  "$SERVER:$APP_DIR/cms/.tmp/data.db"

echo "==> Copying uploaded media files"
rsync -avz --progress --delete \
  "$CMS_LOCAL/public/uploads/" \
  "$SERVER:$APP_DIR/cms/public/uploads/"

echo "==> Restarting Strapi"
ssh "$SERVER" "pm2 restart strapi 2>/dev/null || echo 'Strapi not yet configured — start it after setting up .env'"

echo ""
echo "Migration complete."
echo "Database and media are now on the server."
