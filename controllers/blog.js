/*GET Blog List Page*/
module.exports.bloglist=function(req,res){
	res.render('blogList',{title: 'Blog List'});
};

/*GET BlogAdd Page*/
module.exports.blogadd=function(req,res){
	res.render('blogAdd',{title: 'Blog Add'});
};
