var express = require('express');
var router = express.Router();
var controlHome = require ('../controllers/home');
var controlBlog = require ('../controllers/blog');

/* Set Routes */
router.get('/',controlHome.home);
router.get('/blogList',controlBlog.bloglist);
router.get ('/blogAdd',controlBlog.blogadd);
router.get('/blogEdit',controlBlog.blogedit);
router.get ('/blogDelete',controlBlog.blogdelete);

module.exports = router;
