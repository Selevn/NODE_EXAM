const app = require('express')();
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;
const session = require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: '123456789'
});
const Users = [
    {user: 'user1', password: 'user1'},
    {user: 'user2', password: 'user2'},
    {user: 'user3', password: 'user3'}
];

passport.use(new DigestStrategy({qop:'auth'},(user, done)=>{
    let cr = Users.find(e => e.user.toUpperCase() === user.toUpperCase());
    if(!cr) return done(null, false);
    else return done(null, cr.user, cr.password);
}, (params, done)=>{
    console.log(`Params: ${JSON.stringify(params)}`);
    done(null, true);
}));
passport.serializeUser((user, done) => {
    console.log('serialize', user);
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log('deserialize', user);
    done(null, user);
});

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', (req, res, next)=>{
    console.log('Login');
    if(req.session.logout && req.headers['authorization']){
        req.session.logout = false;
        delete req.headers['authorization'];
    }
    next();
}, passport.authenticate('digest', {session: false}), (req, res, next)=>{
    if(req.session.logout === undefined)
        req.session.logout = false;
    next();
})
    .get('/login', (req, res, next)=>{
        res.end('Login');
    });

app.get('/logout', (req, res)=>{
    console.log('Logout');
    req.session.logout = true;
    delete req.headers['authorization'];
    res.redirect('/login');
});

app.get('/resource', (req, res)=>{
    console.log('Resource');
    if(req.session.logout === false && req.headers['authorization'])
        res.end('Resource');
    else res.redirect('/login')
});

app.listen(3000, () => console.log('Server is running on 3000'));