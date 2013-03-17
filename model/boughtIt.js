var mongoose = require('mongoose');

var schema = mongoose.Schema({
	user_id: 'ObjectId',
	vendor: 'string',
	price: 'number',
	additives: [{
		name: 'string',
		value: 'string'
	}]
});

var BoughtIt = mongoose.model('BoughtIt', schema);

module.exports = {
    create: function (boughtIt, callback) {
        var b = new BoughtIt({
        	user_id: boughtIt.userId,
        	vendor : boughtIt.vendor,
        	price: boughtIt.price
        });
        b.save(function () {
            callback(b);
        });
    }
}