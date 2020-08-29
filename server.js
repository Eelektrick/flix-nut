var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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
	data = {testdata: "this is a test #1"};
	console.log("We got this far #1");

	// Show logged-in profile page:
	//res.render("index", data);

	// Show login page
	//res.render("login")
	//redirect to /login?

  });

  app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
  });
