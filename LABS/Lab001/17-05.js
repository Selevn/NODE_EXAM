import {createClient} from 'redis';

const publisher = createClient();
const subscriber = publisher.duplicate();

publisher.connect();
subscriber.connect();

subscriber.subscribe('channel', (message)=>console.log(`Got message: ${message}`))

let i = 0;
setInterval(()=>{
    if(publisher.isOpen)
        publisher.publish('channel', `message № ${++i}`)
}, 1000)

setTimeout(()=>{
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
},10000)