const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    console.log('A: ',req.query.a)
    console.log('B: ',req.query.b)
    res.send(String(Number(req.query.a)+Number(req.query.b)));
})

app.listen(port, () => console.log(`Listening on port ${port}`));