var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	blogTitle: String,
	blogText: String,
	createdOn: {
		type: Date,
		"default": Date.now()
	},
	authorName: String,
	authorEmail: String,
	rating: {
		type: Number,
		"default": 0,
		min: 0,
		max: 5
	},
	reviews: [reviewSchema]
});

var reviewSchema = new mongose.Schema({
	author: { type: String, required: true },
	rating: {
		type: Number,
		required: true,
		min: 0,
		max, 5
	},
	reviewText: { type: String, required: true },
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

mongoose.model('blogger', blogSchema);
