const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    try {
      const parsedUrl = url.parse(req.url, true);
      const searchParams = parsedUrl.query;
      const firstName = searchParams.firstname || "Guest";
      const lastName = searchParams.lastname || "Tseug";

      const fullName = `${firstName} ${lastName}`;

      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
      });
      res.end(`Hello ${fullName}`);
    } catch (error) {
      console.error('Error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
