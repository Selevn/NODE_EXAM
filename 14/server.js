const http = require('http');
const url = require("url");

const requestListener = function (req, res) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    const parsed = {...url.parse(req.url, true).query};
    console.log('Query parsed: ', parsed)

    res.writeHead(200, headers);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(8080);