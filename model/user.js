var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {
		first: 'string',
		last: 'string'
	},
	facebookId: 'string'
});

var User = mongoose.model('User', schema);

module.exports = {
	findOrCreate: function (name, facebookId, callback) {
		User.findOne({ 'facebookId': facebookId }, function (err, user) {
			if (user === null) {
				var newUser = new User({ 
					facebookId: facebookId,
					name: {
						first: name.givenName,
						last: name.familyName
					}
				});
				newUser.save(function(err) {
					callback(newUser);
				});
			} else {
				callback(user);
			}
		});
	}
};