import {createClient} from 'redis';
import {table} from "table";

const getTime = () => new Date().getTime()

//чем больше данных, тем дольше операция get относительно остальных
const count = 100000;

const client = createClient({
    url: 'redis://127.0.0.1:6379/0'
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

await client.connect();

const resultTable = [];

let timer = getTime();
for (let i = 0; i < count; i++) {
    client.HSET(i, JSON.stringify({
        id:i,
        val: count-i
    }));
}
resultTable.push([`hset`, getTime()-timer])

timer = getTime();
for (let i = 0; i < count; i++) {
    client.HGET(i);
}
resultTable.push([`hget`, getTime()-timer])



console.log(table(resultTable));






