const Restaurant = require('../db/Restaurant.js')

module.exports = {

    index(req,res){
        //send all the restaurants in the database to the 
        //client side as an array with json object as elements
       Restaurant.find({},function(err,restaurants){
                if(err){
                    console.log(err);
                }else{
                    res.json(restaurants);
                }
       });
    },

    // ES6 version of create : function(req,res)
    create(req,res){
        //get the information from the website
        var restaurant = req.body;
        var new_restaurant = Restaurant({
            name: restaurant.name,
	        address: restaurant.address,
            link: restaurant.link
        });

        //save the new restaurant to Mongodb
        new_restaurant.save((err) => {
            if (err) throw err;

            console.log('restaurant saved!');
        });
        
        //find the recent added object send back to client
        Restaurant.find({name : restaurant.name},function(err,restaurant){
                if(err){
                    console.log(err);
                }else{
                    res.json(restaurant);
                }
        });
    },

    delete(req,res){
        var restaurant_id = req.params.id;
        //find the id from mongoDB and also remove it 
        Restaurant.findByIdAndRemove({_id : restaurant_id},function(err,restaurant){
                if(err){
                    console.log(err);
                }else{
                    res.json(restaurant);
                }
        });
        
    },

    view(req,res){
        var restaurant_id = req.params.id;
        Restaurant.findById({_id : restaurant_id},function(err,restaurant){
                if(err){
                    console.log(err);
                }else{
                    res.json(restaurant);
                }
        });
    },
}