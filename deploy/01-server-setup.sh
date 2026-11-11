#!/usr/bin/env bash
# Run this script on the Droplet as root (or with sudo).
# Usage: bash 01-server-setup.sh
set -euo pipefail

REPO="https://github.com/Eyitayo-olawande/grier-museum.git"
BRANCH="phase-a-strapi"
APP_DIR="/var/www/grier-museum"
WEB_ROOT="/var/www/griermuseum.org/html"

echo "==> 1. System update"
apt-get update -y && apt-get upgrade -y

echo "==> 2. Install Node.js 20 LTS"
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "==> 3. Install PM2, nginx, certbot"
npm install -g pm2
apt-get install -y nginx python3-certbot-nginx

echo "==> 4. Create web root for static site"
mkdir -p "$WEB_ROOT"
chown -R www-data:www-data /var/www/griermuseum.org

echo "==> 5. Clone repository"
if [ -d "$APP_DIR/.git" ]; then
  echo "    Repo already cloned, pulling latest"
  git -C "$APP_DIR" pull origin "$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
fi

echo "==> 6. Install Next.js dependencies"
cd "$APP_DIR"
npm ci

echo "==> 7. Install Strapi dependencies"
cd "$APP_DIR/cms"
npm ci

echo "==> 8. Build Strapi admin panel (TypeScript compile)"
NODE_ENV=production npm run build

echo "==> 9. Enable nginx and PM2 on boot"
systemctl enable nginx
pm2 startup systemd -u root --hp /root | tail -1 | bash

echo ""
echo "======================================================"
echo " Server setup complete."
echo " Next steps:"
echo "  1. Run 02-migrate-data.sh from your LOCAL Mac"
echo "  2. Create /var/www/grier-museum/cms/.env"
echo "     (copy from local cms/.env, change PUBLIC_URL)"
echo "  3. Create /var/www/grier-museum/.env.local"
echo "     (STRAPI_URL and STRAPI_TOKEN for the build)"
echo "  4. Add nginx configs and get SSL certs"
echo "  5. Run 03-start-services.sh"
echo "======================================================"
