const http = require('http');
const path = require('path');
const fs = require("fs");
const port = 8080;

const requestListener = function (req, res) {

    const filePath = path.join("static", `${req.url}`);

    try{
        if(!fs.existsSync(filePath) || fs.lstatSync(filePath).isDirectory()){
            throw new Error()
        }
        fs.createReadStream(filePath).pipe(res)
    } catch (e) {
        res.statusCode = 404;
        res.end();
    }
}

const server = http.createServer(requestListener);
server.listen(port, ()=>{console.log(`Server listen on localhost:${port}`)});