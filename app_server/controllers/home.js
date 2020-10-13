var request = require('request');
var apiOptions = {
	server : "https://localhost:80"
};

/*GET homepage*/
module.exports.home=function(req,res){
	res.render('home',{title:'Benjamin Mullins\' Blog Site'});
};
