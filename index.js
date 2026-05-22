const http = require('http');
const fs = require('fs');
const path = require('path');

// Render sets the environment variable PORT automatically. We default to 3000 for local testing.
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Serve the bidding dashboard HTML file for all main traffic
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error: Missing index.html');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else {
        // Simple 404 handler for fallback traffic
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server successfully spinning up on port ${PORT}`);
});