var mongoose = require('mongoose');
var Blog = mongoose.model('blogger');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// GET blog using id