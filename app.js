var express = require('express')
    , app = express()
	, http = require('http')
	, server = http.createServer(app)
	, engine = require('ejs-locals')
	, mongoose = require('mongoose')
    , passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , boughtIt = require('./model/boughtIt');
    
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: '135163399997068',
    clientSecret: '691056bec6b7960c7f1b8339e88cc9a4',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
    },
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

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
    app.use(app.router);
});

app.get('/', ensureAuthenticated, function (req, res) {
    res.render('index', { isLoggedIn: true });
});

app.get('/boughtit', function(req, res) {
    boughtIt.create("pants", function(model) {
        res.render('boughtit', model);
    });
});

app.get('/madeit', function(req, res) {
    res.render('madeit');
});

app.get('/auth/facebook', passport.authenticate('facebook'), function(req, res) { });

app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

mongoose.connect('mongodb://coffee:coffee@ds033317.mongolab.com:33317/coffeeapp');

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
    res.render('index', { isLoggedIn: false });
}