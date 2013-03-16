var config = {
	mongo: {
		connectionString: 'mongodb://coffee:coffee@ds033317.mongolab.com:33317/coffeeapp'
	},
	facebook: {
		clientId: '135163399997068',
		clientSecret: '691056bec6b7960c7f1b8339e88cc9a4',
		callbackUrl: 'http://localhost:3000/auth/facebook/callback'
	}
};

module.exports = config;