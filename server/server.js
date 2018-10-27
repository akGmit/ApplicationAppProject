var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Mongo db connection
var mongoose = require('mongoose');
var mongooseUserDb = require('mongoose');
mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');
mongooseUserDb.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');






//Mongoose post scheme
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String
});

var UserSchema = new Schema({
    username: String,
    password: String
});

// Compile model from schema
var PostModel = mongoose.model('PostModel', PostSchema );
var UserModel = mongooseUserDb.model("Users", UserSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.post('/login', function(req, res){
    
    let usr = req.body.username;
    let pass = req.body.password;

    var query = UserModel.find({username: usr, password: pass}, 'username password');
    
    query.exec(function(err, user){
        if(err){
            console.log(err);
            res.status(200).send({"result": "false"});
        }
        else if(!user.length){
            console.log("boom");
            res.status(200).send({"result": "false"});
        }
        else if(user[0].username == usr && user[0].password == pass){
            res.status(200).send({"result": "true"});
            console.log("true");
        }else{
            res.status(200).send({"result": "false"});
            console.log("false");
        }
    })
    
});

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);

    PostModel.create(
        {
            title: req.body.title,
            content: req.body.content
        });
    
    
    
})

app.get('/api/posts', function(req, res){

    PostModel.find({}, 'title content', function(err, posts){
        if(err){
          console.log(err);
        } else{
            res.status(200).json({posts:posts});
            console.log('retrieved posts', posts.length, posts[4].id);
        }
    })  
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})