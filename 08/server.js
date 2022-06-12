const http = require('http');
const url = require("url");

const requestListener = function (req, res) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    res.writeHead(200, headers);

    const parsed = url.parse(req.url, true).query

    res.end(`request: ${JSON.stringify(parsed)}, c+d = ${Number(parsed.c)+Number(parsed.d)}`);
}

const server = http.createServer(requestListener);
server.listen(8080);