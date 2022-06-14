import {createClient} from 'redis';

const client = createClient({     url: 'redis://127.0.0.1:6379/0' });

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

await client.connect();