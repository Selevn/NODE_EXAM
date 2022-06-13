const spawn = require('child_process').spawn;
const child = spawn('node', ['pet.js']);

child.stdout.pipe(process.stdout);

const ping = spawn('ping', ['vk.com']);
ping.stdout.on('data', (data) => {
    console.log('PING: '+data.toString())
})
