var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Mongo db connection
var mongoose = require('mongoose');
var mongooseUserDb = require('mongoose');
var mongooseUserAppDB = require('mongoose');

//User application db
mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');
//User login DB
mongooseUserDb.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');
//User application DB
mongooseUserAppDB.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');

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
    lastname: String,
    id: String
});

//User application schema
var UserAppSchema = new Schema({
    id: String,
    firstname: String,
    lastname: String,
    tel: String,
    email: String,
    address: [
        {street: String,
        city: String,
        county: String,
        zip: String}
    ],
    experience: String,
    bio: String
})

// Compile models from schema
var PostModel = mongoose.model('PostModel', PostSchema );
var UserModel = mongooseUserDb.model("Users", UserSchema);
var UserAppModel = mongooseUserAppDB.model("Applications", UserAppSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

//--------------LOGIN---------------------
//Login request, if username and password valid, respond with user
app.post('/login', function(req, res){
    //Query for checking if username and password exist in user database
    var query = UserModel.findOne({username: req.body.username, password: req.body.password});
    
    //Execute query with calback function
    query.exec(function(err, user){
        //If reuturn object not null, username and password valid, send user object as response
        if(user != null){
            res.status(200).send(user);
            console.log(user.firstname);
        //If object returned from query is null, data is incorrect, send null response
        }else if(user === null){
            res.send(null);
        }
    });
});
//--------------EDN LOGIN---------------------

////--------------NEW USER---------------------
//New username, with middleware functions to check if username is available
app.post('/newuser', function(req, res, next){
    
    //Query to find username
    var usernameTakenQuery = UserModel.findOne({username : req.body.username});
    
    //Execute query 
    usernameTakenQuery.exec(function(err, user){
        
        //If username doesnt exist, go to next middleware function
        if(user === null){
            next();
        //If username is taken, send response
        }else{
            console.log("username taken");
            res.send({"usernameTaken" : true});
        }
    })
})

//Function to create new user if username is available
app.post('/newuser', function(req, res){

    //New user model 
    var newUsr = new UserModel({username: req.body.username, password: req.body.password,
        firstname: req.body.firstName, lastname: req.body.lastName});
    
    //New user promise
    var newUserPromise = UserModel.create(newUsr);
    
    //Execute new user promise with call back function
    newUserPromise.then(function(newUser){      
        //Send new user as response
        res.send(newUser);
    })
});
////--------------END NEW USER---------------------


//--------------APPLICATION---------------------

//Function to create user's application in database
app.post('/application', function(req, res){
    console.log(req);
    
    //UserApplication model
    var application = new UserAppModel({id: req.body.id, firstname: req.body.firstname, lastname: req.body.lastname,
    tel: req.body.tel, email: req.body.email, address: req.body.address, experience: req.body.experience,
       bio: req.body.bio});
    
    //UserApplication promise
    var applicationCreate = UserAppModel.create(application);
    
    //Execeute userapplication promise
    applicationCreate.then(function(app){
        console.log(app);
        res.send(app);
    })
});

//Funtion to deal with get request to return user's application data
app.get('/application', function(req, res){
    console.log(req.body.firstname);
    var userID = UserAppModel.findOne({id : req.body.id});
    
    userID.exec(function(err, app){
        res.send(app);
    })
});


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})