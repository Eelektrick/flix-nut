var path = require("path");
var db = require("../models");
const axios = require("axios");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", async function(req, res) {
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
		//console.log("All movies:", JSON.stringify(watchedMovies, null, 2));
		var i = 0;
		var mobRating = 0;
		var yourRating = 0;
		for (i = 0; i < watchedMovies.length; i++){
			//console.log(watchedMovies[i].averageRating);
			//console.log(watchedMovies[i].userRating);	
			mobRating = parseInt(mobRating) + parseInt(watchedMovies[i].averageRating);
			yourRating = parseInt(yourRating) + parseInt(watchedMovies[i].userRating);
		}
		mobRating = Math.round((mobRating / watchedMovies.length), 0);
		yourRating = Math.round((yourRating / watchedMovies.length),0);	
		//console.log(mobRating);
		//console.log(yourRating);	
		ratingsObject = {"mobRating":mobRating, "yourRating":yourRating, "watchedMovies":watchedMovies};
		return ratingsObject;
	  };

		ratingsObject = await movieRatings().then(ratingsObject => {
			//console.log("mobRating?: " + ratingsObject.mobRating)
			//console.log("yourRating?: " + ratingsObject.yourRating)
			//console.log("ratingsObject 2:", JSON.stringify(ratingsObject, null, 2));
			return ratingsObject;
		})

		//console.log("ratingsObject 2:", JSON.stringify(ratingsObject, null, 2));
	  
		//ratingsObject = {mobRating:12, yourRating:13};

		if (ratingsObject.mobRating >= 90) {
			mobColor = "rating-1";
		} else if (ratingsObject.mobRating >= 80) {
			mobColor = "rating-2";
		} else if (ratingsObject.mobRating >= 70) {
			mobColor = "rating-3";
		} else if (ratingsObject.mobRating >= 60) {
			mobColor = "rating-4";
		} else {
			mobColor = "rating-5";
		}

		if (ratingsObject.yourRating >= 90) {
			yourColor = "rating-1";
		} else if (ratingsObject.yourRating >= 80) {
			yourColor = "rating-2";
		} else if (ratingsObject.yourRating >= 70) {
			yourColor = "rating-3";
		} else if (ratingsObject.yourRating >= 60) {
			yourColor = "rating-4";
		} else {
			yourColor = "rating-5";
		}

		return res.render("index", {
			userId: req.session.passport.user.id,
			watchedMovies: ratingsObject.watchedMovies,
			mobRating: ratingsObject.mobRating,
			mobColor: mobColor,
			yourColor: yourColor,
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