var mongoose = require('mongoose');
var User = mongoose.model('User');
var Blog = mongoose.model('blogger');


var sendJSONresponse = function(res, status, content) {
	res.status(status);
	res.json(content);
};
