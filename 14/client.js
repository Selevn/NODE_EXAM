const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/?a=3&b=5',
    method: 'GET',
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

req.end();