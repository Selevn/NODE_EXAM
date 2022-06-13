const rpcWSS = require('rpc-websockets').Server;
let server = new rpcWSS({ port: 8081, host: 'localhost' });

server.setAuth(credentials => credentials.login === 'admin' && credentials.password === 'admin');

server.register('sum', (params) => {
    console.log(params);
    console.log(params.length)
    return params.length == 2 ? Number(params[0]) + Number(params[1]) : 'Invalid arguments';
}).public();

server.register('mul', (params) => {
    let mul = 1;
    params.forEach(item => {
        if (Number.isInteger(item)) mul *= item;
    });

    return mul;
}).protected();