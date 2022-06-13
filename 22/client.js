const rpcWSC = require('rpc-websockets').Client;
let ws = new rpcWSC('ws://localhost:8081');

ws.on('open', () => {
    ws.call('sum', [11, 4]).then((result) => { console.log(result) });
    ws.login({ login: 'admin', password: 'admin' })
        .then(() => {
            ws.call('mul', [3, 5, 7])
                .then((result) => { console.log(result) })
        })
})
