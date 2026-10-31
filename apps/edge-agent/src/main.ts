import { createServer } from 'node:http';
const port = Number(process.env.EDGE_PORT ?? 3002);
const server = createServer((req, res) => {
  if (req.url !== '/health' || req.method !== 'GET') {
    res.writeHead(404, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: 'not_found' }));
    return;
  }
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ status: 'ok', service: 'fida-edge-agent', version: '0.1.0', enrolled: false }));
});
server.listen(port, '127.0.0.1');
