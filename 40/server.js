const app = require('express')();
const cookieparser = require('cookie-parser')
const cookiesecret = '1234567890';

app.use(cookieparser(cookiesecret));

app.get('/',(req,res,next)=> {
    let myid = req.signedCookies.myid;
    if (isFinite(myid)) ++myid;
    else myid = 0;
    if (myid>5) res.clearCookie('myid').send(`myid = ${myid}`);
    else  res.cookie('myid', myid, {signed:true}).send(`myid = ${myid}`);
    console.log('myid = ', myid);
})

app.listen(8080)