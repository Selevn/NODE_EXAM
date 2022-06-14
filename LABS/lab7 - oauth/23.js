const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
//const GoogleStrategy = require('passport-google-oauth2').Strategy;

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', cookie: { sameSite: false }}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LinkedInStrategy({
    clientID: '781r018fixkke2',//'730692526078-m3f3plnqnv7403poo6meamokrqob153q.apps.googleusercontent.com',
    clientSecret: 'vj84QOUYWfDA6J1v',//'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',
    callbackURL: 'http://127.0.0.1:4001/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_liteprofile'] }));

app.get('/auth/linkedin/callback', /*(req, res, next) => {
    passport.authenticate('linkedin', (err, user, info) => {
        console.log(user)
        if (err) return next(err);
        if (!user) return res.redirect('/login');
        req.logIn(user, (err) => err ? next(err) : res.redirect('/resource'));
    })(req, res, next);
}*/
    (req, res, next)=>{
        console.log(req)
        next()
    },
    passport.authenticate('linkedin', {
        successRedirect: '/resource',
        failureRedirect: '/login'
    })
);
app.get('/resource', (req, res) =>  req.user ? res.send(`You have successfully logged in, ${req.user.displayName}`) : res.send(`Please authorize`));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/*', (req, res) => res.send('404 not found'));
app.listen(4001);
