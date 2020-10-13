var mongoose = require('mongoose');
var Blog = mongoose.model('blogger');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


// GET blog using id
module.exports.blogsReadOne = function(req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    Blog
      .findById(req.params.blogid)
      .exec(function(err, location) {
        if (!location) {
          sendJSONresponse(res, 404, {
            "message": "blog id not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(location);
        sendJSONresponse(res, 200, location);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};


// GET a list of all blogs
module.exports.blogsReadAll = function(req, res) {
  console.log('Getting blogs list');
  Blog
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildBlogList(req, res, results));
      }); 
};

var buildBlogList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      _id: obj._id,
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      CreatedOn: obj.ceatedOn
    });
  });
  return blogs;
};


