var mongoose = require('mongoose');

var schema = mongoose.Schema({
	username: 'string',
	facebookId: 'string'
});

var User = mongoose.model('User', schema);

module.exports = {
	findOrCreate: function (username, facebookId, callback) {
		User.findOne({ 'facebookId': facebookId }, function (err, user) {
			if (user === null) {
				var newUser = new User({ 
					facebookId: facebookId,
					username: username
				});
				user.save(function(err) {
					callback(newUser);
				});
			} else {
				callback(user);
			}
		});
	}
};