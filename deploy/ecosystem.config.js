// PM2 process config — lives at /var/www/grier-museum/deploy/ecosystem.config.js
// Start with: pm2 start deploy/ecosystem.config.js
// Save state: pm2 save

module.exports = {
  apps: [
    {
      name: 'strapi',
      cwd: '/var/www/grier-museum/cms',
      script: 'npm',
      args: 'run start',
      env: {
        NODE_ENV: 'production',
      },
      // Restart after 500 MB RSS to guard against memory leaks
      max_memory_restart: '500M',
      // Log files
      out_file: '/var/log/pm2/strapi-out.log',
      error_file: '/var/log/pm2/strapi-err.log',
      merge_logs: true,
    },
    {
      name: 'webhook',
      cwd: '/var/www/grier-museum/deploy',
      script: 'webhook-server.js',
      env: {
        NODE_ENV: 'production',
        // Set this to a strong random string — same value goes into
        // the Strapi webhook Authorization header (Bearer <secret>)
        WEBHOOK_SECRET: 'REPLACE_WITH_A_STRONG_RANDOM_SECRET',
      },
      out_file: '/var/log/pm2/webhook-out.log',
      error_file: '/var/log/pm2/webhook-err.log',
      merge_logs: true,
    },
  ],
};
