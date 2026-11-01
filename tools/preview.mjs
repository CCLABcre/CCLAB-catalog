import http from 'node:http';
import { watch, createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const clients = new Set();
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
const reloadScript = `<script>(()=>{const events=new EventSource('/__preview_events');events.addEventListener('change',()=>location.reload());})();</script>`;
const server = http.createServer(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); return res.end(); }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  if (pathname === '/__preview_events' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', Connection: 'keep-alive' });
    res.write(': connected\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  const parts = pathname.replaceAll('\\', '/').split('/');
  if (parts.some(part => part.startsWith('.')) || parts.includes('tools')) { res.writeHead(403); return res.end('Forbidden'); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const relative = path.relative(root, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) { res.writeHead(403); return res.end('Forbidden'); }
  try {
    const info = await stat(file);
    if (!info.isFile()) throw new Error('Not a file');
    res.setHeader('Content-Type', mime[path.extname(file).toLowerCase()] || 'application/octet-stream');
    if (req.method === 'HEAD') return res.end();
    if (path.extname(file).toLowerCase() === '.html') {
      const { readFile } = await import('node:fs/promises');
      return res.end((await readFile(file, 'utf8')).replace('</body>', `${reloadScript}</body>`));
    }
    const stream = createReadStream(file);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch { res.writeHead(404); res.end('Not found'); }
});
let timer;
const watcher = watch(root, { recursive: true }, (_, filename) => {
  if (!filename || filename.split(/[\\/]/).some(part => part.startsWith('.')) || filename.startsWith('tools')) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    for (const client of clients) client.write('event: change\ndata: reload\n\n');
  }, 150);
});
const heartbeat = setInterval(() => { for (const client of clients) client.write(': heartbeat\n\n'); }, 20000);
server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. Try http://localhost:${port}` : error.message);
  clearInterval(heartbeat);
  watcher.close();
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => console.log(`CCLAB preview: http://localhost:${port}\nSave a file to refresh automatically. Ctrl+C to stop.`));
function stop() {
  clearInterval(heartbeat);
  clearTimeout(timer);
  watcher.close();
  for (const client of clients) client.end();
  server.close();
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
