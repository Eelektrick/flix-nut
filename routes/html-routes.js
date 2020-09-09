var path = require("path");
var db = require("../models");
const axios = require("axios");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {

		const movieQuery = async () => {
		  const watchedMovies = await db.Movie.findAll({
			  attributes: ['movieName', 'userRating', 'averageRating', 'moviePoster', 'moviePlot'],
			  where: {
				  userId: req.session.passport.user.id
			  },
			  raw: true,
		  });
		  return watchedMovies;
		}

      //const ratingsArray = await movieRatings();
      //console.log("All movies:", JSON.stringify(watchedMovies, null, 2));

      // var i = 0;
      // for (i = 0; i < watchedMovies.length; i++) {
      // 	mobRating = mobRating + watchedMovies[i].averageRating;
      // 	yourRating = yourRating + watchedMovies[i].userRating;
      // }

      //mobRating = 66;
	  //yourRating = 69;

	  const movieRatings = async ()=>{
		const watchedMovies = await movieQuery();
		console.log("All movies:", JSON.stringify(watchedMovies, null, 2));
		var i = 0;
		var mobRating = 0;
		var yourRating = 0;
		for (i = 0; i < watchedMovies.length; i++){
			mobRating = mobRating + watchedMovies[i].averageRating;
			yourRating = yourRating + watchedMovies[i].userRating;
		}
		mobRating = mobRating / watchedMovies.length;
		yourRating = yourRating / watchedMovies.length;	
		console.log(mobRating);
		console.log(yourRating);	
		ratingsObject = {"mobRating":mobRating, "yourRating":yourRating, "watchedMovies":watchedMovies};
		return ratingsObject;
	  };

		movieRatings().then(ratingsObject => {
			console.log("mobRating?: " + ratingsObject.mobRating)
			console.log("yourRating?: " + ratingsObject.yourRating)
		})
	  
		return res.render("index", {
			userId: req.session.passport.user.id,
			watchedMovies: ratingsObject.watchedMovies,
			mobRating: ratingsObject.mobRating,
			yourRating: ratingsObject.yourRating
		});
		
    }
    res.render("login");
  });
  

  app.get("/login", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
  });

};