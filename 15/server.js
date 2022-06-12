const http = require('http');
const url = require("url");
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
            console.log('Pure body', body)
            const parsed = {...qs.parse(body)}
            console.log('BODY: ', parsed)
            res.writeHead(200, headers);
        });
    }

    console.log('Query: ',req.url)
    console.log('Query parsed: ',{...url.parse(req.url, true).query})


    const parsed = {...url.parse(req.url, true).query};
    console.log('Query parsed: ', parsed)

    res.writeHead(200, headers);
    res.end();
}

const server = http.createServer(requestListener);
server.listen(8080);