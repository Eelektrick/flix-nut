if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
};

const express = require("express");
const exphbs = require("express-handlebars");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const initializePassport = require('./config/passport-config.js');
initializePassport(
    passport,
    // users is a temporary reference to a local array. This will have to be changed to pull from the db.
    email => users.find(user => user.email === email),
    id => users.find(
        user => user.id === id)
    );

    // Delete me later
const users = [];

var app = express();

var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));



//static content for the app from the public directory
app.use(express.static("public"));

var animals = [
	{
	  animalType: "dog",
	  pet: true,
	  fierceness: 4
	}, {
	  animalType: "cat",
	  pet: true,
	  fierceness: 10
	}, {
	  animalType: "giraffe",
	  pet: false,
	  fierceness: 4
	}, {
	  animalType: "zebra",
	  pet: false,
	  fierceness: 8
	}, {
	  animalType: "lion",
	  pet: false,
	  fierceness: 10
	}
  ];

  app.get("/", function(req, res) {
	
	// Use SESSION/userId info or whatever to query db for user info
		// If they are good to go, show 
  
	//data = { animals: animals }
	data = {
		testdata: "this is a test #1",
		MovieTitle: "TestMovie1",
		MovieDescription: "MovieDescription1"
	};
	console.log("We got this far #1");

	// Show logged-in profile page:
	res.render("index", data);

	// Show login page
	//res.render("login")
	//redirect to /login?

  });

  app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
  });
