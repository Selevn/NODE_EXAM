const express = require('express');
const xml2js = require('xml2js');
const app = express();
const port = process.env.PORT || 8080;

bodyparser = require('body-parser');

app.use(bodyparser.text());

app.post('/', (req, res) => {
    console.log('Body: '+req.body)
    const parser = new xml2js.Parser();
    parser.parseString(req.body, (err, result) => {
        if (err) {
            console.log('Err: '+err.message);
            res.send('Err: '+err.message);
        } else {
            res.send(String(Number(result.xml.a[0])+Number(result.xml.b[0])))
        }
    });
})


app.listen(port, () => console.log(`Listening on port ${port}`));