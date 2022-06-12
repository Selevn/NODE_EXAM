const http = require('http');
const querystring = require("querystring");

const post_data = querystring.stringify({
    a: 5,
    b: 7
});

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(post_data)
    }
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
        process.stdout.write(d.toString('hex'));
    });
});

req.on('error', error => {
    console.error(error);
});
req.end(post_data);