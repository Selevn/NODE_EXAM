const http = require('http');

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
        const parsed = JSON.parse(body)
        console.log(parsed)
        console.log(parsed.a+parsed.b)
    });
});

req.on('error', error => {
    console.error(error);
});

req.end();