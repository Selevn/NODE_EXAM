const http = require('http');
const fs = require("fs");

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/pipe',
    method: 'GET',
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
    res.pipe(fs.createWriteStream('output.txt'))
});

req.on('error', error => {
    console.error(error);
});

req.end();