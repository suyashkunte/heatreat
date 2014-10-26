	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
		username: String,
		score: Number,
		date: {type: Date, default: Date.now},
		country: String
	});

	module.exports = mongoose.model('Score', schema);