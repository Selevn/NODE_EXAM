const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'my key'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new LocalStrategy((username, password, done) => {
    for (let user of users) {
        if (username === user.login && password === user.password)
            return done(null, user);
    }
    return done(null, false, {message: 'Check credentials'});
}))

app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));

app.post( '/login', passport.authenticate('local', { successRedirect: '/resource', failureRedirect: '/login' }));
app.get('/resource', (req, res, next) => req.user ? next() : res.redirect('/login'), (req, res) => res.send(`Resource`));

app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('login');
});

app.listen(4000);