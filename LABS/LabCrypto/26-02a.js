const express = require('express')
const app = express()


const {
    generateKeyPairSync,
    createSign,
    createVerify,
    createPublicKey,
    X509Certificate,
    KeyObject
} = require('node:crypto');

const { privateKey, publicKey } = generateKeyPairSync('ec', {
    namedCurve: 'sect239k1', publicKeyEncoding: {
        type: 'spki'
        , format: 'pem'
    }
    , privateKeyEncoding: {
        type: 'pkcs8'
        , format: 'pem'
    }
});

app.get('/sertificate', function (req, res) {
    res.send(publicKey)
})
app.get('/file', (req,res) => {
    const text = 'Skorodumov Ivan Ivanovich';
    const sign = createSign('SHA256');
    sign.write(text);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');

    const verify = createVerify('SHA256');
    verify.write('some data to sign');
    verify.end();
    //console.log(verify.verify(createPublicKey(publicKey.toString('hex')), signature, 'hex'));



    res.setHeader('Content-type', "application/octet-stream");

    res.setHeader('Content-disposition', 'attachment; filename=file.txt');

    res.send(text+signature);
})


/*
const verify = createVerify('SHA256');
verify.write('some data to sign');
verify.end();
console.log(verify.verify(publicKey, signature, 'hex'));

app.use(bodyParser.json())
app.all('/', function (req, res) {
    res.send()
})
app.get('/rest', function (req, res) {
    stage = 0;
    //alice = createDiffieHellman(2048);
    //aliceKey = alice.generateKeys();
    //aliceSecret = ''
    res.send('OK')
})

app.get('/resource', (req, res, next)=>{

    const crypto = require('crypto');
    const ENC_KEY = aliceSecret; // set random encryption key
    const IV = "5183666c72eec9e4"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');


    var encrypt = ((val) => {
        let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    });

    res.send(encrypt('Skaradumau ivan ivanavich'))
})*/
/*

// Generate Alice's keys...
const alice = createDiffieHellman(2048);
const aliceKey = alice.generateKeys();

// Generate Bob's keys...
const bob = createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

// Exchange and generate the secret...
const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey);

// OK
assert.strictEqual(aliceSecret.toString('hex'), bobSecret.toString('hex'));
*/
/*

*/

app.listen(3001, 'localhost',1,()=>{
    console.log('Started')
})
