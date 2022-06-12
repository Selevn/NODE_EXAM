const http = require('http');

const port = 8080;

const requestListener = function (req, res) {

    if(req.url.startsWith('/404')){
        res.statusCode = 404
    }

    if (req.method === 'GET') {
        console.log('Method get')
        res.end('GET')
    }
    if (req.method === 'POST') {
        console.log('Method POST')
        res.end('POST')
    }
    if (req.method === 'PUT') {
        console.log('Method PUT')
        res.end('PUT')
    }
    if (req.method === 'DELETE') {
        console.log('Method DELETE')
        res.end('DELETE')
    }
}

const server = http.createServer(requestListener);
server.listen(port, ()=>{console.log(`Server listen on localhost:${port}`)});