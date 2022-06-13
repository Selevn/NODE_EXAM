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

app.use('/', (req, res, next)=>{
    console.log('Must not be shown on "/" route')
    next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));