var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});
var ctrlBlogs = require('../controllers/blogs');
var ctrlAuth = require('../controllers/authentication');
var ctrlReviews = require('../controllers/reviews.js

router.get('/blogs', ctrlBlogs.blogGetAll);
router.get('/blogs/:blogid', ctrlBlogs.blogGetOne);
router.post('/blogs', auth, ctrlBlogs.blogCreate);
router.put('/blogs/:blogid', auth, ctrlBlogs.blogUpdateOne);
router.delete('/blogs/:blogid', auth, ctrlBlogs.blogDeleteOne);
router.get('/blogs/:blogid/reviews', ctrlReviews.reviewGetAll);
router.post('/blogs/:blogid/reviews', ctrlReviews.reviewCreate);
router.put('/blogs/:blogid/reviews/:reviewid', ctrlReviews.reviewUpdateOne);
router.delete('blogs/:blogid/reviews/:reviewid', ctrlReviews.reviewDeleteOne);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
