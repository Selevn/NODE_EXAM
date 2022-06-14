const express = require('express')
const app = express()

var bodyParser = require('body-parser')

const {
    createDiffieHellman
} = require('node:crypto');


let alice = createDiffieHellman(256);
let aliceKey = alice.generateKeys();
let aliceSecret;
let stage = 0;

app.use(bodyParser.json())
app.all('/', function (req, res) {
    console.log(stage)

    if(stage === 0)
    {
        res.send(JSON.stringify({
            prime:alice.getPrime(),
            gen: alice.getGenerator(),
            aliceKey
        }))
    }
    if(stage === 1)
    {
        let bobKey = req?.body?.bobKey;
        if(!bobKey){

            res.status(409, 'No bob key').send()
            return
        }
        aliceSecret = alice.computeSecret(Buffer.from(bobKey.data));
        console.log(aliceSecret)
        res.send('Ok')
    }
    if(stage === 2)
    {
        res.send('Stage == 2. Go to /rest to start new key generation phase')
    }
    stage++;

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
})
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

app.listen(3000, 'localhost',1,()=>{
    console.log('Started')
})