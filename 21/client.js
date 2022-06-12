var WebSocketClient = require('websocket').client;
var client = new WebSocketClient();


function handler(connection) {
    connection.on('message', function (message) {
        console.log(message);
    })
    connection.sendUTF('Hi, there!');
}

client.on('connect', handler);

client.connect('ws://localhost:8080/');