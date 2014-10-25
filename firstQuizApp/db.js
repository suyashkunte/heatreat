var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/firstQuizApp');

module.exports = mongoose.connection;