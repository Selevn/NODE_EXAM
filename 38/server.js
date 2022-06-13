const express = require('express');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;

app.get('/attachment', (req, res) => {
    // just sets headers:
    // Content-Disposition: attachment; filename="logo.png"
    // Content-Type: image/png
    res.attachment('static/shrek.png')
    fs.createReadStream('static/shrek.png').pipe(res)
})

app.get('/download', (req, res) => {
    //set headers and send file
    res.download('static/shrek.png')
})

app.listen(port, () => console.log(`Listening on port ${port}`));