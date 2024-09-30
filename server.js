const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    try {
      const parsedUrl = url.parse(req.url, true);
      const searchParams = parsedUrl.query;

      const width = searchParams.width || '96';
      const height = searchParams.height || '96';

      const svgWidth = parseInt(width) || 96;
      const svgHeight = parseInt(height) || 96;

      const customText = `${svgWidth}x${svgHeight}`;
      const fontSize = Math.max(10, svgHeight * 0.1);

      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}">
          <rect width="${svgWidth}" height="${svgHeight}" fill="#cccccc"></rect>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${fontSize}" fill="#333333">${customText}</text>
        </svg>
      `.trim();

      const base64SVG = Buffer.from(svgContent).toString('base64');
      const base64Image = `data:image/svg+xml;base64,${base64SVG}`;
      
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      });
      res.end(JSON.stringify({ base64Image }));
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
