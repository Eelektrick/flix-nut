var path = require("path");
var db = require("../models");
const axios = require("axios");
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", async function(req, res) {
    if (req.user) {

		const watchedMovies = await db.Movie.findAll({
			attributes: ['movieName', 'userRating', 'averageRating', 'moviePoster', 'moviePlot'],
			where: {
				userId: req.session.passport.user.id
			},
			raw: true,
		});

		//console.log("All movies:", JSON.stringify(watchedMovies, null, 2));

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