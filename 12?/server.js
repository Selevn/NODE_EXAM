const http = require('http');
const fs = require("fs");
const path = require("path");

function getBoundary(request) {
    let contentType = request.headers['content-type']
    const contentTypeArray = contentType.split(';').map(item => item.trim())
    const boundaryPrefix = 'boundary='
    let boundary = contentTypeArray.find(item => item.startsWith(boundaryPrefix))
    if (!boundary) return null
    boundary = boundary.slice(boundaryPrefix.length)
    if (boundary) boundary = boundary.trim()
    return boundary
}

function getMatching(string, regex) {
    // Helper function when using non-matching groups
    const matches = string.match(regex)
    if (!matches || matches.length < 2) {
        return null
    }
    return matches[1]
}

const server = http.createServer(function(req, res) {
    if(req.url === '/favicon.ico') return res.statusCode = 404, res.end();

    console.log(req.method + ' ' + req.url);
    let data = '';
    req.on('data', function(chunk) {
        data += chunk;
    });
    req.on('end', function() {
        const boundary = getBoundary(req)
        const rawDataArray = data.split(boundary)
        for (let item of rawDataArray) {
            const value = getMatching(item, /(?:\r\n\r\n)([\S\s]*)(?:\r\n--$)/)
            if (!value) continue
            const filename = getMatching(item, /(?:filename=")(.*?)(?:")/)
            console.log(value.length)
            console.log(typeof value)
            fs.writeFileSync(path.join(__dirname,'uploaded',filename), value)
        }
    });
    res.end('done');
});

server.listen(8080, function() {
    console.log('listening on 8080');
});