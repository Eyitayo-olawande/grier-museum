#!/usr/bin/env bash
# Run on the Droplet after:
#   - 01-server-setup.sh has run
#   - 02-migrate-data.sh has run (from your Mac)
#   - /var/www/grier-museum/cms/.env is in place
#   - /var/www/grier-museum/.env.local is in place
#   - DNS A records for griermuseum.org and cms.griermuseum.org point to this server
set -euo pipefail

APP_DIR="/var/www/grier-museum"

echo "==> 1. Create PM2 log directory"
mkdir -p /var/log/pm2

echo "==> 2. Install nginx site configs"
cp "$APP_DIR/deploy/nginx/griermuseum.org"     /etc/nginx/sites-available/griermuseum.org
cp "$APP_DIR/deploy/nginx/cms.griermuseum.org" /etc/nginx/sites-available/cms.griermuseum.org

ln -sf /etc/nginx/sites-available/griermuseum.org     /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/cms.griermuseum.org /etc/nginx/sites-enabled/

nginx -t && systemctl reload nginx
echo "    nginx reloaded"

echo "==> 3. Obtain SSL certificates (requires DNS to be live)"
certbot --nginx \
  -d griermuseum.org \
  -d www.griermuseum.org \
  --non-interactive --agree-tos -m admin@griermuseum.org

certbot --nginx \
  -d cms.griermuseum.org \
  --non-interactive --agree-tos -m admin@griermuseum.org

echo "==> 4. Start Strapi and webhook server via PM2"
cd "$APP_DIR"
pm2 start deploy/ecosystem.config.js
pm2 save

echo "==> 5. First site build"
bash "$APP_DIR/deploy/rebuild.sh"

echo ""
echo "======================================================"
echo " Services are running."
echo " Site:    https://griermuseum.org"
echo " CMS:     https://cms.griermuseum.org/admin"
echo ""
echo " Final step: configure the Strapi webhook"
echo "   Settings > Webhooks > Add a webhook"
echo "   URL:     http://127.0.0.1:9000/rebuild"
echo "   Headers: Authorization = Bearer <WEBHOOK_SECRET>"
echo "   Events:  entry.publish, entry.unpublish, entry.update, entry.delete"
echo "======================================================"
