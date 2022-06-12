const http = require('http');
const url = require("url");

const requestListener = function (req, res) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-type': 'application/json'
    };


    res.writeHead(200, headers);
    res.end(JSON.stringify({a:1, b:2}));
}

const server = http.createServer(requestListener);
server.listen(8080);