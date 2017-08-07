const Vote= require('../db/Vote.js');
var moment = require('moment');
var tz = require('moment-timezone');

function get_startend_time(){
    var now= moment.utc().tz('America/Los_Angeles'); 
    var current_hour = now.hour();
    //Need modification = 12
    if(current_hour > 12){
        //Set start to today's Los Angeles' time 12:30 pm
        var now_start = moment.utc().tz('America/Los_Angeles') 
        now_start.set(
            {'hour': 12, 
            'minute': 30, 
            'second' : 0 , 
            'millisecond' : 0
            });
        var start = (now_start.toISOString())
        //Set start to tommorrow's Los Angeles' time 12:30 pm
        var now_end = moment().tz('America/Los_Angeles') ;
        //first change it to tomorrow
        now_end.add(1, 'days')
        now_end.set(
            {
            'hour': 12, 
            'minute': 30, 
            'second' : 0 , 
            'millisecond' : 0
            });
        var end = (now_end.toISOString())
    }
    else if(current_hour == 12){
        var current_minute = now.minute();
        if(current_minute > 30){
            //Set start to today's Los Angeles' time 12:30 pm
            var now_start = moment.utc().tz('America/Los_Angeles') 
            now_start.set(
                {'hour': 12, 
                'minute': 30, 
                'second' : 0 , 
                'millisecond' : 0
                });
            var start = (now_start.toISOString())
            //Set start to tommorrow's Los Angeles' time 12:30 pm
            var now_end = moment().tz('America/Los_Angeles') ;
            //first change it to tomorrow
            now_end.add(1, 'days')
            now_end.set(
                {
                'hour': 12, 
                'minute': 30, 
                'second' : 0 , 
                'millisecond' : 0
                });
            var end = (now_end.toISOString())
        }
        else{
            //Set start to yesterday's Los Angeles' time 12:30 pm
            var now_start = moment().tz('America/Los_Angeles') ;
            //first change it to tomorrow
            now_start.substract(1, 'days')
            now_start.set(
                {
                'hour': 12, 
                'minute': 30, 
                'second' : 0 , 
                'millisecond' : 0
                });
            var start = (now_start.toISOString())
            //Set start to today's Los Angeles' time 12:30 pm
            var now_end = moment.utc().tz('America/Los_Angeles') 
            now_end.set(
                {'hour': 12, 
                'minute': 30, 
                'second' : 0 , 
                'millisecond' : 0
                });
            var end = (now_end.toISOString())
        }
    }
    else{
        //Set start to yesterday's Los Angeles' time 12:30 pm
    var now_start = moment().tz('America/Los_Angeles') ;
        //first change it to tomorrow
        now_start.substract(1, 'days')
        now_start.set(
            {
            'hour': 12, 
            'minute': 30, 
            'second' : 0 , 
            'millisecond' : 0
            });
        var start = (now_start.toISOString())
        //Set start to today's Los Angeles' time 12:30 pm
        var now_end = moment.utc().tz('America/Los_Angeles') 
        now_end.set(
            {'hour': 12, 
            'minute': 30, 
            'second' : 0 , 
            'millisecond' : 0
            });
        var end = (now_end.toISOString())
    }
    return [start,end];
}


module.exports = {
    index(req,res){
        var startend_arr = get_startend_time();
        var start = startend_arr[0];
        var end = startend_arr[1];
        Vote.find({date : {$gte: start, $lte: end}},function(err,votes){
                if(err){
                    console.log(err);
                }else{
                    res.json(votes);
                }
        });
    },

    create_for(req,res){
        var vote = req.body;

        var new_vote = Vote({ 
            name: vote.name,
            date: new Date(),
            agree: [vote.name_restaurant,vote.id_restaurant],
            disagree:["",""]
        });

        new_vote.save((err) => {
            if (err) throw err;

            console.log('vote saved!');
        });
        
        res.sendStatus(200);
    },

    create_against(req,res){
        var vote = req.body;
        var new_vote = Vote({ 
            name: vote.name,
            date: new Date(),
            agree : ["",""],
            disagree:[vote.name_restaurant,vote.id_restaurant]
        });

        new_vote.save((err) => {
            if (err) throw err;

            console.log('vote saved!');
        });
 
        res.sendStatus(200);
    }
}
