const fs = require("fs");
const http = require("http");

const {
    createVerify,
} = require('node:crypto');
const file = fs.createWriteStream("out.txt");

http.get("http://localhost:3001/file", response => {
    var stream = response.pipe(file);

    stream.on("finish", function() {

        const file = fs.readFileSync('./out.txt')

        const signature = file.toString().slice(-132);
        const data = file.toString().slice(0, file.length-132);

        http.get("http://localhost:3001/sertificate", res => {
            var body = '';
            res.on('data', function(chunk) {
                body += chunk;
            });
            res.on('end', function() {
                const publicKey = Buffer.from(body);

                const verify = createVerify('SHA256');
                verify.write(data);
                verify.end();

                console.log(data)
                console.log(publicKey)
                console.log(signature)
                console.log('Is valid? ',verify.verify(publicKey, signature, 'hex'));

            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });


    });



});
