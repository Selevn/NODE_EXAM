const http = require('http');
const fs = require("fs");

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'GET',
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    let body = '';
    res.on('data', d => {
        body+=d;
    });
    res.on('end', ()=>{
        const parsed = body
        fs.writeFileSync('downl/export.txt',body);
        console.log('Downloaded: '+parsed.length)
    });
});

req.on('error', error => {
    console.error(error);
});

req.end()