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
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blog id not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
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

var buildBlogList = function(req, res, results) { // Creates array of blogs
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      _id: obj._id,
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      createdOn: obj.ceatedOn
    });
  });
  return blogs;
};

/* POST new blog */
module.exports.blogCreate = function(req, res){
	console.log(req.body);
	Blog
		.create({
			blogTitle: req.body.blogTitle,
			blogText: req.body.blogText,
			createdOn: req.body.createdOn
		}, function(err, location){
			if(err){
				console.log(err);
				sendJSONresponse(res, 400, err);
			} else{
				console.log(location);
				sendJSONresponse(res, 201, location);
			}
		}
		);
};

/* Update one blog entry */
module.exports.blogsUpdateOne = function(req, res) {
    console.log("Updating a blog entry with id of " + req.params.blogid);
    console.log(req.body);
    blogModel
  	  .findOneAndUpdate(
	     { _id: req.params.blogid },
 	     { $set: {"blogTitle": req.body.blogTitle, "blogAuthor": req.body.blogAuthor}}, // not sure of this bit
	     function(err, response) {
	         if (err) {
	  	         sendJSONresponse(res, 400, err);
	         } else {
		        sendJSONresponse(res, 201, response);
	        }
	    }
    );

/* Delete one blog */
module.exports.blogsDeleteOne = function(req, res){
	console.log("Deleting blog with id of " + req.param.blogid);
	console.log(req.body);
	blogModel
		.findByIdAndRemove(req.params.blogid) 
		.exec (
			function(err, response){
				if(err){
					sendJSONresponse(res, 404, err);
				} else{
					sendJSONresponse(res, 204, null);
				}
			}
		);
};

