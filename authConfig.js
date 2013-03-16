var passport = require('passport')
	, config = require('./config')
    , FacebookStrategy = require('passport-facebook').Strategy
    , User = require('./model/user')

var authConfig = {

	init: function() {
		passport.serializeUser(function(user, done) {
		    done(null, user);
		});

		passport.deserializeUser(function(obj, done) {
		    done(null, obj);
		});

		passport.use(new FacebookStrategy({
			    clientID: config.facebook.clientId,
			    clientSecret: config.facebook.clientSecret,
			    callbackURL: config.facebook.callbackUrl
		    },
		    function (accessToken, refreshToken, profile, done) {
		        User.findOrCreate(profile.name, profile.id, function (user) {
		            done(null, user);
		        })
		    }
		));
	}
};

module.exports = authConfig;