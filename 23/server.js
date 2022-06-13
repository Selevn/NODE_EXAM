const http = require('http');
const fs = require('fs');

let server = http.createServer();

server.on('request', (req, resp) => {
    console.log('ANY request');
    if (req.method === "GET" && req.url === "/pipe") {
        console.log('request');
        fs.createReadStream("static/file.txt").pipe(resp);
    }
})

server.listen(8080);
