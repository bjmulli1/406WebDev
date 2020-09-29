var mongoose = require('mongoose');

var blogEntrySchema = new mongoose.Schema({
	blogTitle: String,
	blogText: String,
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

//Tells data to use blogEntrySchema
mongoose.model("blogger",blogEntrySchema);
