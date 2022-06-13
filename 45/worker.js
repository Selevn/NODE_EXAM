const { Worker } = require('worker_threads')

const worker = new Worker('./worker_child.js', {workerData: { a:5, b:7 }});
worker.on('message', (message)=>{
    console.log('worker message: ',message)
});
worker.on('error', (err)=>{
    console.log('worker error: ',err)
});
worker.on('exit', (code) => {
    console.log('Worker exited with code ' + code);
})