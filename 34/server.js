const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use((req, res, next)=>{
    console.log(`Method ${req.method} - URL ${req.url}`);
    next();
    console.log('After next');
});

app.get('/', (req, res)=>{
    res.send('Hello World!');
});

app.get('/route1', (req, res)=>{
    res.send('Route 1');
});

app.get('/route_with_parms/:x/route_end', (req, res)=>{
    res.send('Path param '+req.params.x);
});

app.get('/:id(\\d+)/', function (req, res){
    res.send('Path only number param '+req.params.id);
});

app.get('/:id([A-Za-z]+)/', function (req, res){
    res.send('Path only symbols '+req.params.id);
});


app.get('/:id/', function (req, res){
    res.send('Path not only number param '+req.params.id);
});

app.get('/route2', (req, res)=>{
    res.send('Route 2');
});


app.listen(port, () => console.log(`Listening on port ${port}`));