const { workerData, parentPort } = require('worker_threads')

console.log('workerData: ',workerData)

let tmp = 1;

setInterval(()=>{
    tmp*=workerData.a+workerData.b;
    parentPort.postMessage(tmp)
}, 1000)

setTimeout(()=>{
    process.exit(0)
},10000)
