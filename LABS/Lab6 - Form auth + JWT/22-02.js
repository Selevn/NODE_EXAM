const app = require('express')();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const redis = require('redis');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const client = redis.createClient();

const sequelize = new Sequelize(
    {dialect: 'sqlite',
    storage: './database.sqlite'
});

const Model = Sequelize.Model;
class Users extends Model{}
Users.init (
    {
        id:	{type: Sequelize.INTEGER, autoIncrement: true, primaryKey:true},
        login:{type: Sequelize.STRING, allowNull:false},
        password:	{type: Sequelize.STRING, allowNull:false}
    },
    {sequelize,timestamps: false, Users:'Users', tableName:'Users'}
);

const accessKey = 'access';
const refreshKey = 'refresh';
var oldRefreshKeyCount = 0;

app.use(cookieParser('cookie'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    if (req.cookies.accessToken) {
        jwt.verify(req.cookies.accessToken, accessKey, (err, payload) => {
            if (err) next();
            else if(payload) {
                req.payload = payload;
                next();
            }
        });
    }
    else next();
});

app.get('/login', (req, res) => res.sendFile(__dirname + '/login.html'));

app.get('/register', (req, res) => res.sendFile(__dirname + '/register.html'));

app.post('/login', async (req, res) => {
   const candidate = await Users.findOne({
       where: {
           login: req.body.username,
           password: req.body.password
       }
   });
   if (candidate) {
       const accessToken = jwt.sign({id: candidate.id, login: candidate.login}, accessKey, {expiresIn: 10 * 60});
       const refreshToken = jwt.sign({id: candidate.id, login: candidate.login}, refreshKey, {expiresIn: 24 * 60 * 60});
       res.cookie('accessToken', accessToken, {
           httpOnly: true,
           sameSite: 'strict'
       });
       res.cookie('refreshToken', refreshToken, {
           httpOnly: true,
           sameSite: 'strict'
       });
       res.redirect('/resource');
   } else 
       res.redirect('/login');
});

app.post('/register', async (req, res) => {
   const candidate = await Users.findOne({
       where: {
           login: req.body.username
       }
   });
   if (candidate) res.redirect('/register');
   else {
       await Users.create({
           login: req.body.username,
           password: req.body.password
       });
       res.redirect('/login');
   }
});

app.get('/refresh-token', (req, res) => {
    if (req.cookies.refreshToken) {
        jwt.verify(req.cookies.refreshToken, refreshKey,async (err, payload) => {
            if (err) console.log(err.message);
            else if(payload) {
                client.set(oldRefreshKeyCount, req.cookies.refreshToken, () => console.log('set old refresh token'));
                client.get(oldRefreshKeyCount, (err, result) => console.log('added old refresh token:', result));
                oldRefreshKeyCount++;
                client.quit();
                const candidate = await Users.findOne({
                    where: {
                        id: payload.id
                    }
                });
                const newAccessToken = jwt.sign({id: candidate.id, login: candidate.login}, accessKey, {expiresIn: 10 * 60});
                const newRefreshToken = jwt.sign({id: candidate.id, login: candidate.login}, refreshKey, {expiresIn: 24 * 60 * 60});
                res.cookie('accessToken', newAccessToken, {httpOnly: true, sameSite: 'strict'});
                res.cookie('refreshToken', newRefreshToken, {path: '/refresh-token'});
                res.redirect('/resource');
            }
        });
    }
    else res.status(401).send('Please, authorize');
});

app.get('/resource', (req, res) => 
    req.payload ? res.status(200).send(`Resource ${req.payload.id}-${req.payload.login}`) : res.status(401).send('Non authorized'));

app.get('/logout', (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.redirect('/login');
});

sequelize.sync()
    .then(() => app.listen(3000, () => console.log("Server is running on 3000")))
    .catch(error => console.log(error));