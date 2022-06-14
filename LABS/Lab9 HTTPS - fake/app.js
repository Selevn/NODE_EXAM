const app = require('express')();
const https = require('https');
const fs = require('fs');

const options = { key: fs.readFileSync(__dirname + '/ssl/sii.key'), cert: fs.readFileSync(__dirname + '/ssl/sii.crt') };

app.get('/', (req, res) => res.send('hello'));

app.get('/test', (req, res) => res.send('test'));

https.createServer(options, app).listen(3443).on('error', (e) => console.log(`Listener | error: ${e.code}`));

//create ssl certificate 
//openssl req -x509 -newkey rsa:2048 -keyout LAB.key -out LAB.crt -days 365 -nodes