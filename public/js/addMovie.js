$(document).ready(function () {
  var addMovieForm = $("form.addMovieClass");
  var userRating = $("input#userRating");
  var averageRating = $("input#averageRating");
  var movieName = $("input#movieName");
  var userId = $("input#userId");


  addMovieForm.on("submit", function (event) {
    event.preventDefault();
    var movieData = {
		userRating: userRating.val().trim(),
		averageRating: averageRating.val().trim(),
		movieName: movieName.val().trim(),
		userId: userId.val().trim(),
    };

    if (!movieData.userRating || !movieData.averageRating || !movieData.movieName || !movieData.userId) {
      return;
    }
    addMovie(movieData.userRating, movieData.averageRating, movieData.movieName, movieData.userId);
    //userRating.val("");
	//averageRating.val("");
	//movieName.val("");
	//userId.val("");
  });

  function addMovie(userRating, averageRating, movieName, userId) {

	console.log("we got this far. Just before posting to route");

    $.post("/api/addmovie", {
		userRating: userRating,
		averageRating: averageRating,
		movieName: movieName,
		userId: userId,
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