// Tiny webhook receiver — listens on localhost:9000 for Strapi publish events
// and triggers a site rebuild. Runs via PM2.
'use strict';

const http = require('http');
const { exec } = require('child_process');
const path = require('path');

const SECRET = process.env.WEBHOOK_SECRET;
const REBUILD = path.join(__dirname, 'rebuild.sh');
const PORT = 9000;

if (!SECRET) {
  console.error('WEBHOOK_SECRET env var is not set — refusing to start');
  process.exit(1);
}

let building = false;

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/rebuild') {
    res.writeHead(404); res.end(); return;
  }

  const auth = req.headers['authorization'];
  if (auth !== `Bearer ${SECRET}`) {
    res.writeHead(401); res.end('Unauthorized'); return;
  }

  res.writeHead(202); res.end('Rebuild queued');

  if (building) {
    console.log('[webhook] Build already in progress — skipping');
    return;
  }

  building = true;
  const start = Date.now();
  console.log(`[webhook] Build started at ${new Date().toISOString()}`);

  exec(`bash ${REBUILD}`, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
    building = false;
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    if (err) {
      console.error(`[webhook] Build FAILED after ${elapsed}s`);
      console.error(stderr);
    } else {
      console.log(`[webhook] Build succeeded in ${elapsed}s`);
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[webhook] Listening on 127.0.0.1:${PORT}`);
});
