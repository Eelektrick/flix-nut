var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {


  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json({
      email: req.user.email,
      id: req.user.id
  });
  });

  app.post("/api/signup", function(req, res) {

    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
		console.log("This is the error catch");
        res.status(401).json(err);
      });
  });

  app.post("/api/addmovie", function(req, res) {

    db.Movie.create({
      userId: req.body.userId,
      userRating: req.body.userRating,
      averageRating: req.body.averageRating,
      movieName: req.body.movieName,
      moviePoster: req.body.moviePoster,
      moviePlot: req.body.moviePlot,
    })
    .then(function() {
      res.redirect("/");
    })
    .catch(function(err) {
      console.log("This is the error catch: " + err);
          res.status(401).json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};