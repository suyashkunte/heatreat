	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;
	var ObjectId = Schema.ObjectId;

	var schema = new Schema({
		title: String,
		answers: {
			correct: String,
			incorrect: [String] },
		entered: {type: Date, default: Date.now}
	});

	module.exports = mongoose.model('Question', schema);