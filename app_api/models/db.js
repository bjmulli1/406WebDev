var mongoose = require('mongoose');
var Blog = mongoose.model('blogger');

var sendJSONresponse = function(res, status, content){
	res.status(status);
	res.json(content);
};

/* GET blog by id */
module.exports.blogGetOne = function(req, res) {
	console.log('Finding blog details', req.params);
	if (req.params && req.params.blogid) {
		Blog
			.findById(req.params.blogid)
			.exec(function(err, location) {
				if (!location) {
					sendJSONresponse(res, 404, {
						"message": "blogid not found"
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

/* GET list of all blogs */
module.exports.blogGetAll = function(req, res){
	console.log('Getting blog list');
	Blog
		.find()
		.exec(function(err, results){
			if(!results){
				sendJSONresponse(res, 404, {
					"message": "no blogs found"	
				});
				return;
			} else if(err){
				console.log(err);
				sendJSONresponse(res, 404, err);
				return;
			}
			console.log(results);
			sendJSONresponse(res, 200, buildBlogList(req, res, results));
		});
};

var buildBlogList = function(req, res, results){
	var blogs = [];
	results.forEach(function(obj){
		blogs.push({
			_id: obj._id,
			blogTitle: obj.blogTitle,
			blogText: obj.blogText,
			createdOn: obj.createdOn
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

/* Update one blog */
module.exports.blogUpdateOne = function(req, res){
	console.log("Updating a blog with id of " + req.params.blogid);
	console.log(req.body);
	Blog
		.findOneAndUpdate(
			{ _id: req.params.blogid},
			{ $set: {"blogTitle": req.body.blogTitle, "blogText": req.body.blogText, "createdOn": req.body.createdOn}},
			function(err, response){
				if(err){
					sendJSONresponse(res, 400, err);
				} else{
					sendJSONresponse(res, 201, response);
				}
			}
		);
};

/* Delete one blog */
module.exports.blogDeleteOne = function(req, res){
	console.log("Deleting blog with id of " + req.param.blogid);
	console.log(req.body);
	Blog
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
