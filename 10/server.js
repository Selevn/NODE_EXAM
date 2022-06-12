const http = require('http');
const qs = require("querystring");

const requestListener = function (req, res) {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': 2592000, // 30 days
    };

    if (req.method === 'POST') {
        let body = '';
        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            const parsed = {...qs.parse(body)}
            console.log('BODY: ', parsed)
            res.writeHead(200, headers);
            res.end(`${Number(parsed.a)+Number(parsed.b)}`);
        });
    }
}

const server = http.createServer(requestListener);
server.listen(8080);