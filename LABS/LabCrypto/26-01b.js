const fetch = require('node-fetch');

const {
    createDiffieHellman
} = require('node:crypto');

(async () => {
    try {
        let response = await fetch('http://localhost:3000/')
        let json = await response.json()
        const aliceKey = json.aliceKey;
        const bob = createDiffieHellman(Buffer.from(json.prime.data),Buffer.from(json.gen.data));
        const bobKey = bob.generateKeys();
        console.log(bobKey)
        response = await fetch('http://localhost:3000/', {
            method: 'post',
            body: JSON.stringify({bobKey}),
            headers: {'Content-Type': 'application/json'}
        });
        const bobSecret = bob.computeSecret(Buffer.from(aliceKey.data));
        console.log('BS',bobSecret);

        response = await fetch('http://localhost:3000/resource');


        const cipher = await response.text()
        console.log(cipher)
        const IV = "5183666c72eec9e4"; // set random initialisation vector
        const crypto = require('crypto');

        var decrypt = ((encrypted) => {
            let decipher = crypto.createDecipheriv('aes-256-cbc', bobSecret, IV);
            let decrypted = decipher.update(encrypted, 'base64', 'utf8');
            return (decrypted + decipher.final('utf8'));
        });

        console.log(decrypt(cipher))

    } catch (error) {
        console.log(error)
    }
})();