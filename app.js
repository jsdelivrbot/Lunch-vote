var express = require("express");
var path = require("path");

var app = express();
var port = process.env.PORT || 3000;

//Prepare for the ejs path and template
app.set('views', './client/view');
app.set('view engine', 'ejs');

//make the '/' path relate to local client folder
app.use('/', express.static(path.join(__dirname, 'client')));

app.get('/',function (req,res){
    res.render('index')
})

app.listen(port)