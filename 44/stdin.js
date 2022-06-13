const fs = require("fs");

fs.createReadStream('file.txt').pipe(process.stdout);

process.stdin.pipe(fs.createWriteStream('output.txt'));

process.on('SIGINT', () => {
    process.stdin.end();
    console.log('Got SIGINT. Exiting.');
    process.exit(0);
})