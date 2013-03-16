var mongoose = require('mongoose');

var schema = mongoose.Schema({ name: 'string' });
var boughtIt = mongoose.model('BoughtIt', schema);

module.exports = {
    create: function (name, callback) {
        var b = new boughtIt({ name : name });
        b.save(function() {
            callback(b);
            console.log("Saved some " + name);
        });
    }
}