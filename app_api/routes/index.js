var express = require('express');
var router = express.Router();
var ctrlBlogs = require('../controllers/blogs');

/* Request blogs */
router.get('/blogs', ctrlBlogs.blogGetAll);
router.post('/blogs', ctrlBlogs.blogCreate);
router.get('/blogs/:blogid', ctrlBlogs.blogGetOne);
router.put('/blogs/:blogid', ctrlBlogs.blogUpdateOne);
router.delete('/blogs/:blogid', ctrlBlogs.blogDeleteOne);

module.exports = router;
