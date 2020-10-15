var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

// Blog Requests 
router.post('/blogs', ctrlBlogs.blogsCreate);
router.get('/blogs:blogid', ctrlBlogs.blogsReadOne);
router.put('/blogs:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogid', ctrlBlogs.blogDeleteOne);
router.get('/blogs', ctrlBlogs.blogsReadAll);

module.exports = router;
