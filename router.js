const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const multer  = require("multer")
const fileUpload = require('express-fileupload');
var passport = require('passport');
var expressSession = require('express-session');
var mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const app = express();
app.set("view engine", "hbs");
app.use(fileUpload());
app.use(express.static(__dirname + "/dist"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

const domain = "localhost";
const port = "27017";
const mongodbUrl = `mongodb://${domain}:${port}/`;
/*** Запросы
CRUD на изображения. (х4)
ВСЕ (мои) изображения (х2)
Регистрация
Авторизация.
8 запросов
 **/



passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

mongoose.model('User',{
    username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});
// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallBack : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false);                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false);
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}


passport.use('signup', new LocalStrategy({
    passReqToCallBack : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'username':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false);
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);
 
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
     
    // Delay the execution of findOrCreateUser and execute 
    // the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  })
);

// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


/* GET login page. */
  // app.get('/', function(req, res) {
  //   // Display the Login page with any flash message, if any
  //   res.render('index', { message: req.flash('message') });
  // });
 
  /* Handle Login POST */
  app.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash : true 
  }));
 
  /* GET Registration Page */
  // app.get('/signup', function(req, res){
  //   res.render('register',{message: req.flash('message')});
  // });
 
  /* Handle Registration POST */
  app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash : true 
  }));


app.use("/image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").findOne({"_id": objectId(id)}, function(err, result) {
			client.close();
			response.json(result);
		});
	});
});

app.use("/add-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/put-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").updateOne({"_id": objectId(id)}, dataItem, function(err, result) {
			client.close();
			return result;
		});
	});
});

app.use("/delete-image/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").deleteOne({"_id": objectId(id)}, function(err, result) {
			client.close();
			return result;
		});
	});
});


app.use("/images/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").find().toArray(function(err, results) {
			client.close();
			response.json(results);
		});
	});
});

app.use("/images-my/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").find().toArray(function(err, results) {
			client.close();
			response.json(results);
		});
	});
});


app.use("/enter/:id", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/exit/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

app.use("/registr/", function (request, response) {
	if(!request.body) return response.sendStatus(400);
	mongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {   
		const db = client.db("gallery");
		db.collection("images").insertOne(dataItem, function(err, result) {
			if(err) return console.log(err);
			client.close();
			response.json(result.insertedId);
		});
	});
});

["/", "/get-persons", "/get-skills", "/get-effects", "/get-damages", "/get-person/:id"].map( (router) => {
	app.use(router, function (request, response) {
	  response.sendFile(__dirname + "/dist/index.html");
	});
})

app.listen(8080);

