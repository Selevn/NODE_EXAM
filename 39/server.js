const express = require('express');
const multer = require('multer');
const fs = require("fs");
const app = express();
const port = process.env.PORT || 8080;

const upload = multer()

app.post("/uploadImage", upload.single("image"), (req, res)=>{
    console.log(req.file)
    fs.createWriteStream(`upl/${req.file.originalname}`).write(req.file.buffer)
    res.send("Image uploaded")
});

app.listen(port, () => console.log(`Listening on port ${port}`));