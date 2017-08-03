var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// build a new schema for the restaurant type
var RestaurantSchema = new Schema({
	name: {
		type : String,
		//Set index for the schema to increase the search speed
		index : 1,
		//Set Uniqueness to ensure that nothing conflict
		unique : true,
		required : true
	},
	address: {
		type : String,
		index : 1,
		unique : true,
		required : true
	},
	link: {
		type : String,
		index : 1,
		unique : true,
		required : true
	}
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;