const http = require('http');

const requestListener = function (req, res) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    res.writeHead(200, headers);
    console.log(req.url.split('/').filter(Boolean))
    res.end()
}

const server = http.createServer(requestListener);
server.listen(8080);