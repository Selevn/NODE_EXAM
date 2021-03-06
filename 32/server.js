const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// app.use('/static', express.static('static'));

app.use(express.static('static'));

app.listen(port, () => console.log(`Listening on port ${port}`));