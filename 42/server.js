const app = require('express')();

//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res,next)=> {
    //http responses 300 - multiple choices
    //http responses 301 - permanently
    //http responses 302 - found
    //http responses 303 - see other
    //http responses 304 - not modified
    //http responses 305 - use proxy
    //http responses 307 - temporary redirect
    //http responses 308 - permanent redirect

    res.redirect(301,'http://localhost:8080/redirected');
})

app.get('/redirected',(req,res,next)=> {
    console.log('Redirected get request');
    res.send('redirected');
})

app.post('/',(req,res,next)=> {
    res.redirect(308,'http://localhost:8080/redirect_destination');
})

app.post('/redirect_destination',(req,res,next)=> {
    console.log(req.body)
    res.send('redirected a+b='+Number(req.body.a)+Number(req.body.b));
})


app.listen(8080, ()=> console.log('Server started on 8080'));