var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// build a new schema for the restaurant type
var VoteSchema = new Schema({
	name: {
		type : String,
		//Set index for the schema to increase the search speed
		index : 1,
		//Set Uniqueness to ensure that nothing conflict
		unique : true,
		required : true
	},
	date: {
		type : Date,
		index : 1,
		unique : true,
		required : true
	},
	agree :{
		type : [String,String],
		index : 1,
		unique : true,
	},
	disagree :{
		type : [String,String],
		index : 1,
		unique : true,
	}
});

var Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;