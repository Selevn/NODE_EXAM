const http = require('http');
const url = require("url");

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
            console.log('BODY: ', JSON.parse(body))
        });
    }

    console.log('Query: ',req.url)
    console.log('Query parsed: ',{...url.parse(req.url, true).query})

    res.writeHead(200, headers);

    for(let header in req.headers){
        res.write(`${header} - ${req.headers[header]}<br>`)
    }
    res.end(`${req.method} ${req.url} ${req.httpVersion}`);
}

const server = http.createServer(requestListener);
server.listen(8080);