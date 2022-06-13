const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

bodyparser = require('body-parser');

app.use(bodyparser.json());
app.post('/', (req, res) => {
    console.log(req.body)
    res.send('Hello World!');
})


app.listen(port, () => console.log(`Listening on port ${port}`));