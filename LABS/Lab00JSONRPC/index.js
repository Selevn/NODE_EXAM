// Подключаем модуль
const JsonRPCServer = require('jsonrpc-server-http-nats');

// Создаем экземпляр сервера
var server = new JsonRPCServer();

// Обработчик на метод Ping
server.on('Ping', (response) => {
    let error = null;
    let result = 'Pong';
    response(error, result);
});

// Валидатор и обработчик на метод Hello, с проверкой параметра
var validator = function(param) {
    if (typeof(param) !== 'string') {
        throw new Error('Ожидается строка');
    }
    return param;
}
var numberValidator = function(param) {
    if (!Array.isArray(param)) {
        throw new Error('Ожидается массив');
    }
    param.forEach(item => {
        if(!parseInt(item))
            throw new Error('Ожидается массив чисел')
    })
    return param;
}


server.on('Hello', validator, (params, channel, response) => {
    let error = null;
    let result = `Hello ${params} on channel ${channel}!`;
    response(error, result);
});

server.on('Sum', numberValidator, (params, channel, response) => {
    let error = null;
    let result = params.reduce((a,b)=>a+b,0);
    response(error, result);
});
server.on('Mul', numberValidator, (params, channel, response) => {
    let error = null;
    let result = params.reduce((a,b)=>a*b,1);
    response(error, result);
});

server.on('Div', numberValidator, (params, channel, response) => {
    let error = null;
    if(params.length < 2) throw new Error("Должно быть как минимум 2 числа")
    let result = params[0]/params[1];
    response(error, result);
});
server.on('Proc', numberValidator, (params, channel, response) => {
    let error = null;
    if(params.length < 2) throw new Error("Должно быть как минимум 2 числа")
    let result = params[0]/params[1]*100;
    response(error, result);
});



// Возврат ошибки с информацие о канале
server.on('ItIsNotWork', (params, response)=>{
    let error = {
        code: 1,
        message: 'Custom error'
    }
    response(error);
});


// Запустим сервер
server.listenHttp(3000);