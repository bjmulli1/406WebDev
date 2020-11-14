var request = require('request');
var apiOptions = {
	server : "http://3.218.150.65:80"
};

var _showError = function(req, res, status){
	var title, content;
	if(status === 404){
		title = "404, page not found";
		content = "Page could not be found. Sorry!";
	} else{
		title = status + ", something went wrong!";
		content = "Something has gone wrong with this page.";
	}
	res.status(status);
	res.render('generic-text', {
		title: title,
		content: content
	});
};
/* GET 'blog list' page */
module.exports.blogList = function(req, res){
	var requestOptions, path;
	path = '/api/blogs/';
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {},
		qs: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogList(req, res, body);
		}
	);
};

/* Render 'blog list' page */
var renderBlogList = function(req, res, responseBody){
	res.render('blogList', {
		title: 'Blog List', 		
		blogs: responseBody
	});

};

/* Render 'blog add' page */
module.exports.blogAdd = function(req, res){
	res.render('blogAdd', {title: 'Blog Add'});
};

/* Add Blog Post */
module.exports.addPost = function(req, res){
	var requestOptions, path, postdata;
	path = '/api/blogs/';

	postdata = {
		blogTitle: req.body.blogTitle,
		blogText: req.body.blogText,
		createdOn: req.body.createdOn
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "POST",
		json: postdata
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 201){
				res.redirect('/blogList');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};

/* Blog Edit */
module.exports.blogEdit = function(req, res){
	var requestOptions, path;
	path = '/api/blogs/' + req.params.blogid;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogEdit(req, res, body);
		}
	);
};

/* Render 'blog edit' page */
var renderBlogEdit = function(req, res, responseBody){
	res.render('blogEdit', {
		title: 'Blog Edit',
		blog: responseBody
	});
};

/* PUT Blog Edit */
module.exports.editPost = function(req, res){
	var requestOptions, path, postdata;
	var id = req.params.blogid;
	path = '/api/blogs/' + id;

	postdata = {
		_id: id,
		blogTitle: req.body.blogTitle,
		blogText: req.body.blogText,
		createdOn: req.body.createdOn
	};

	requestOptions = {
		url: apiOptions.server + path,
		method: "PUT",
		json: postdata
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 201){
				res.redirect('/blogList');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};

/* Delete blog */
module.exports.blogDelete = function(req, res){
	var requestOptions, path;
	path = "/api/blogs/" + req.params.blogid;
	requestOptions = {
		url: apiOptions.server + path,
		method: "GET",
		json: {}
	};
	request(
		requestOptions,
		function(err, response, body){
			renderBlogDelete(req, res, body);
		}
	);
};

/* Render 'blog delete' page */
var renderBlogDelete = function(req, res, responseBody){
	res.render('blogDelete',{
		title: 'Blog Delete',
		blog: responseBody
	});
};

/* DELETE blog */
module.exports.deletePost = function(req, res){
	var requestOptions, path, postdata;
	var id = req.params.blogid;
	path = '/api/blogs/' + id;

	requestOptions = {
		url: apiOptions.server + path,
		method: "DELETE",
		json: {}
	};

	request(
		requestOptions,
		function(err, response, body){
			if(response.statusCode === 204){
				res.redirect('/blogList');
			} else{
				_showError(req, res, response.statusCode);
			}
		}
	);
};
