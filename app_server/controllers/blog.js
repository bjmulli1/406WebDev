var request = require('request');
var apiOptions = {
	server : "https://localhost:80"
};

/*GET Blog List Page*/
module.exports.bloglist=function(req,res){
	res.render('blogList',{title: 'Blog List', blogEntries:
	[{
		blogTitle: 'FirstBlog',
		blogText: 'Hello world.'
	},
	{
		blogTitle: 'SecondBlog',
		blogText: 'Hello Universe.'
	},
	{
		blogTitle: 'ThirdBlog',
		blogText: 'Hello mom.'
	}]
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
