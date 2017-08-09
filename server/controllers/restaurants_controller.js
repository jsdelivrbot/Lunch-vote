const Restaurant = require('../db/Restaurant.js')
const Vote= require('../db/Vote.js');

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
        });

        //save the new restaurant to Mongodb
        new_restaurant.save((err) => {
            if (err) throw err;

            console.log('restaurant saved!');
        });
        
        res.sendStatus(200);

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
        Vote.remove({restaurant_id : restaurant_id},function(err){
                if(err){
                    console.log(err);
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

    edit(req,res){
        var restaurant_id = req.params.id;
        const restaurantProps = req.body;

        Restaurant.update({ _id: restaurant_id }, restaurantProps, 
                function(err,restaurant){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Update Successfully");
                    }
                })
        //change all the vote related to this restaurant
        Vote.find({"restaurant_id" : restaurant_id }).exec()
          .then((doc) =>
            {
              for(var index = 0;index < doc.length;index ++){
                doc[index].restaurant_name = restaurantProps.name;
                doc[index].save();
              }
            }
        );

        res.sendStatus(200);
    }
}