const app = require('express')();
const sessionSecret = '1234567890';
const session = require('express-session')(
    {
        resave: false,              //сохр, даже если нет изм
        saveUninitialized: false,   //сохр, даже если нет изм
        secret: sessionSecret       //если шифровать
    }
);

app.use(session);

app.get('/',(req,res,next)=> {
    if (!isFinite(req.session.mysesval)) req.session.mysesval = 0;
    else req.session.mysesval++;
    console.log('mysesval = ', req.session.mysesval);
    res.send(`mysesval = ${req.session.mysesval}`);
})

app.listen(8080, ()=> console.log('Server started on 8080'));