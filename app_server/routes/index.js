var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home');
var ctrlBlogPages = require('../controllers/blog');

/* Setup routes to pages */
router.get('/', ctrlHome.home);
router.get('/blogList', ctrlBlogPages.blogList);
router.get('/blogAdd', ctrlBlogPages.blogAdd);
router.get('/blogEdit/:blogid', ctrlBlogPages.blogEdit);
router.get('/blogDelete/:blogid', ctrlBlogPages.blogDelete);
router.post('/blogAdd', ctrlBlogPages.addPost);
router.post('/blogEdit/:blogid', ctrlBlogPages.editPost);
router.post('/blogDelete/:blogid', ctrlBlogPages.deletePost);

module.exports = router;
