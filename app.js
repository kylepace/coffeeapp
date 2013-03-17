var express = require('express')
    , app = express()
	, http = require('http')
	, server = http.createServer(app)
	, engine = require('ejs-locals')
	, mongoose = require('mongoose')
    , passport = require('passport')
    , config = require('./config')
    , authConfig = require('./authConfig')
    , boughtIt = require('./model/boughtIt');

authConfig.init();

app.configure(function () {
    app.engine('ejs', engine);
	app.use('/public', express.static(__dirname + '/public'));
	app.set('view engine', 'ejs');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({ secret: 'friendo mkfriend' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(function (req, res, next) {
        res.locals.user = req.session.user;
        console.log(req.session);
        res.locals.isAuthenticated = req.isAuthenticated();
        next();
    });
    app.use(app.router);
});

app.get('/', ensureAuthenticated, function (req, res) {
    res.render('index', { isLoggedIn: true, title: 'Home' });
});

app.get('/boughtit', function(req, res) {
    res.render('boughtit', { title: 'Bought It' });
});

app.get('/madeit', function(req, res) {
    res.render('madeit', { title: 'Made It' });
});

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res) { });

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

mongoose.connect(config.mongo.connectionString);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log('Listening on port 3000.');
    app.listen(3000);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.render('index', { isLoggedIn: false, title: 'Home' });
}