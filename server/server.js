var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Mongo db connection
var mongoose = require('mongoose');
var mongooseUserDb = require('mongoose');

//User application db
mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');
//User login DB
mongooseUserDb.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');






//Mongoose post scheme
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String
});
//Schema for user login db
var UserSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String
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

//Login     
app.post('/login', function(req, res){
    //Local variables for username and password
    let usr = req.body.username;
    let pass = req.body.password;
    
    //Mongoose query to find user with specified login details 
    var query = UserModel.find({username: usr, password: pass}, 'username password');
    
    //Execute query
    //Check query result  
    query.exec(function(err, user){
        if(err){
            console.log(err);
            res.status(200).send({"result": "false"});
        }
        //If query returns [] - send response as no user like that or wrong login details
        else if(!user.length){
            console.log("boom");
            res.status(200).send({"result": "wrongDetails"});
        }
        //If query returns valid details, send response stating login successful
        else if(user[0].username == usr && user[0].password == pass){
            res.status(200).send({"result": "true"});
            console.log("true");
        }else{
            res.status(200).send({"result": "false"});
            console.log("false");
        }
    })
    
});

app.post('/newuser', function(req, res){

    let usernameTaken = false;

    var checkIfUsernameExists = UserModel.findOne({username: req.body.username});
    //console.log(checkIfUsernameExists);
    checkIfUsernameExists.exec(function(err, user){
        if(user != null){
            console.log(user);
            console.log("usernamae taken");
            res.send({"usernameTaken":"true"});
            usernameTaken = true;
        }
    })
    console.log("username" + usernameTaken);
    //Query to create new user
    var query = UserModel.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstName,
        lastname: req.body.lastName
    });
    //Execute query
    if(usernameTaken == false){
        query.then(function(user){
            console.log(user);
        });
    }
    
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