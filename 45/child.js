process.on('message', function (message) {
    console.log("SUBPROCESS: Received message: " + message);
})

setInterval(()=>{
    console.log('SUBPROCESS: Child is up!')
},3000)

setTimeout(()=>{
    process.exit(0)
},7000)