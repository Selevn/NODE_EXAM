const express = require('express')
const passport = require("passport");
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;

const fs = require("fs");
const cp = require('cookie-parser')
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: 'qrwer1242'
})
// let data = JSON.parse(fs.readFileSync('./database.json').toString())

const app = express();
app.use(cp())
app.use(express.urlencoded({extended:true}))
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

passport.use('custom', new CustomStrategy(
    function(req, done) {
        if(req.body.login === 'Ivan' && req.body.password === 'password')
        {
            done(null, {login: "Ivan"})
        }else{
            done("no user", false);
        }
    }
));

passport.serializeUser((user, done)=>{
    done(null, user)
})
passport.deserializeUser((user, done)=>{
    done(null, user)
})

app.get('/login', (req,res)=>{
    fs.createReadStream('./form.html').pipe(res)
})

app.post('/login', (req, res, next)=>{
    if(req.session.logout && req.headers.authorization) {
        req.session.logout = false;
        delete req.headers.authorization;
    }
    next();
}, passport.authenticate('custom'), (req, res, next)=>{
    if(req.session.logout === undefined)
        req.session.logout = false;
    res.end('login');
})

app.get('/logout', (req, res)=>{
    req.session.logout = true;
    delete req.headers.authorization;
    res.redirect('/login');
})

app.get('/resource', (req, res)=>{
    if(req.session.logout === false && req.headers.authorization)
        res.end('Resource');
    else res.redirect('/login')
});

app.listen(3000, () => console.log('Server is running on 3000'));