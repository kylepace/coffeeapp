var express = require('express')
    , app = express()
	, http = require('http')
	, server = http.createServer(app)
	, engine = require('ejs-locals')
	, mongoose = require('mongoose')
    , boughtIt = require('./model/boughtIt');
    
app.configure(function () {
    app.engine('ejs', engine);
	app.use('/public', express.static(__dirname + '/public'));
	app.set('view engine', 'ejs');
});

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/boughtit', function(req, res) {
    boughtIt.create("pants", function(model) {
        res.render('boughtit', model);
    });
});

app.get('/madeit', function(req, res) {
    res.render('madeit');
});

mongoose.connect('mongodb://coffee:coffee@ds033317.mongolab.com:33317/coffeeapp');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    app.listen(3000);
});
