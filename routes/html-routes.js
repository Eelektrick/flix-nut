var path = require("path");
var db = require("../models");
const axios = require("axios");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    if (req.user) {

		const promiseToDoSomething = () => {
			return new Promise(resolve => {
			  setTimeout(() => resolve('I did something'), 10000)
			})
		  }
		  
		  const watchOverSomeoneDoingSomething = async () => {
			const something = await promiseToDoSomething()
			return something + '\nand I watched'
		  }
		  
		  const watchOverSomeoneWatchingSomeoneDoingSomething = async () => {
			const something = await watchOverSomeoneDoingSomething()
			return something + '\nand I watched as well'
		  }
		  
		  watchOverSomeoneWatchingSomeoneDoingSomething().then(res => {
			console.log(res)
		  })




		//console.log("session: ", JSON.stringify(req.session, null, 2));
		//console.log("userId: " + req.session.passport.user.id)
		//$('#userId').val(req.session.passport.user.id);
		//console.log("email: " + req.session.passport.user.email)
		
		const watchedMovieQuery = async () => {
			const movies = await db.Movie.findAll({
				attributes: ['movieName', 'userRating', 'averageRating'],
				where: {
					userId: req.session.passport.user.id
				}
			});
			return movies;
		}

		//console.log(movies.every(movie => movie instanceof Movie)); // true
		//console.log("All movies:", JSON.stringify(movies, null, 2));

		const watchedMovieApiLoop = async () => {
			const movies = await watchedMovieQuery();
			var i;
			let watchedMovies = new Array();
			for (i = 0; i < movies.length; i++) {
				var movie = movies[i].movieName;
				//var movie = "The Matrix";

				axios
				.get("https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy")
				.then(function(res) {
					console.log("This is the axios response:");
					console.log(res.data.Title);
					var movieInfo = {title:res.data.Title, poster:res.data.Poster, plot:res.data.Plot};
					watchedMovies.push(movieInfo);
					//watchedMovies[i] = movieInfo;
					console.log("Checkpoint 1")
					console.log("watchedMovies:", JSON.stringify(watchedMovies, null, 2));
				});
			}
			console.log("Checkpoint 2")
			console.log("watchedMovies:", JSON.stringify(watchedMovies, null, 2));
			return watchedMovies;
		}

		watchedMovies = watchedMovieApiLoop().then(watchedMovies => {
			console.log("Checkpoint 3")
			console.log("watchedMovies:", JSON.stringify(watchedMovies, null, 2));
			return watchedMovies;
		})

		return res.render("index", {
			userId: req.session.passport.user.id,
			watchedMovies: watchedMovies
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