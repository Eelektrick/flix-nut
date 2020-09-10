//const movie = require("../../models/movie");

$(document).ready(function () {

	console.log("addMovie - we got this far #1");

  var addMovieForm = $("form.addMovieClass");
  var userRating = $("input#userRating");
  var averageRating = $("input#averageRating");
  var movieName = $("input#movieName");
  var moviePoster = $("input#moviePoster");
  var moviePlot = $("input#moviePlot2");
  var userId = $("input#userId");


  addMovieForm.on("submit", function (event) {
	event.preventDefault();
	
	console.log("addMovie - we got this far #2");

    var movieData = {
		userRating: userRating.val().trim(),
		averageRating: averageRating.val().trim(),
		movieName: movieName.val().trim(),
		moviePoster: moviePoster.val().trim(),
		moviePlot: moviePlot.val().trim(),
		userId: userId.val().trim(),
    };

	console.log("userRating: " + movieData.userRating);
	console.log("userRating: " + movieData.averageRating);
	console.log("userRating: " + movieData.movieName);
	console.log("userRating: " + movieData.userId);
	console.log("userRating: " + movieData.moviePoster);
	console.log("userRating: " + movieData.moviePlot);

    if (!movieData.userRating || !movieData.averageRating || !movieData.movieName || !movieData.userId || !movieData.moviePoster || !movieData.moviePlot) {
		console.log("addMovie - we hit this if statement");
		return;
    }
    addMovie(movieData.userRating, movieData.averageRating, movieData.movieName, movieData.userId, movieData.moviePoster, movieData.moviePlot);
    //userRating.val("");
	  //averageRating.val("");
	  //movieName.val("");
	  //userId.val("");
  });

  function addMovie(userRating, averageRating, movieName, userId, moviePoster, moviePlot) {

	  console.log("we got this far. Just before posting to route");

    $.post("/api/addmovie", {
		userRating: userRating,
		averageRating: averageRating,
		movieName: movieName,
		userId: userId,
		moviePoster: moviePoster,
		moviePlot: moviePlot,
    })
    .then(function (data) {
      window.location.replace("/");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});