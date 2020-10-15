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


/*GET Blog List Page*/
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

/* Render the book list page  */
var renderBlogList = function(req, res, responseBody){
    res.render('blogList', {
        title: 'Blog List',
        blogs: responseBody 
    });
};


/*GET BlogAdd Page*/
module.exports.blogadd=function(req,res){
	res.render('blogAdd',{title: 'Blog Add'});
};

/*GET BlogEdit Page*/
module.exports.blogedit=function(req,res){
	res.render('blogEdit',{title: 'Blog Edit'});
};

/*GET BlogDelete Page*/
module.exports.blogdelete=function(req,res){
	res.render('blogDelete',{title: 'Blog Delete'});
};
