var express = require('express');
var router = express.Router();
var controlHome = require ('../controllers/home');
var controlBlog = require ('../controllers/blog');

/* Set Routes */
router.get('/',controlHome.home);
router.get('/blogList',controlBlog.bloglist);
router.get ('/blogAdd',controlBlog.blogadd);
	
module.exports = router;
