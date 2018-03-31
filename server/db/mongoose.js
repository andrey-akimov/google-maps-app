const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin@ds129939.mlab.com:29939/google-map-users');

module.exports = mongoose;
