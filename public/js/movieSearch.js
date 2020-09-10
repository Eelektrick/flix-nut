function displayMovieInfo() {

	var movie = $("#movie-input").val();
	movieYear = movie.substring(movie.indexOf(' '));
	movieYear = movieYear.trim();
	console.log("movieYear: " + movieYear);
	if (!isNaN(movieYear)) {
		movie = movie.substring(0, movie.indexOf(' '));
		movie = movie.trim();
		var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=" + movieYear + "&apikey=trilogy";
		console.log("queryUrl 1: " + queryURL);
	} else {
		var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
		console.log("queryUrl 1: " + queryURL);
	}

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		//var stringified = JSON.stringify(response);
		//var newDiv = $('<div id="test1">').text(stringified);
		//$("body").append(newDiv);

		imdbRating = (response.imdbRating)*10;
		//console.log("imdbNormalized: " + imdbRating);
		rtRating = response.Ratings[1].Value;
		rtRating = rtRating.substr(0,rtRating.length-1);
		//console.log("rtNormalized: " + rtRating);
		mcRating = response.Ratings[2].Value;
		mcRating = mcRating.substring(0, mcRating.indexOf('/'));
		//console.log("mcNormalized: " + mcRating);
		if (!response.imdbRating)

		averageRating = Math.round(((parseInt(imdbRating) + parseInt(rtRating) + parseInt(mcRating))/3), 0);
		//console.log("averageRating: " + averageRating);

		// Truncate plot summary
		truncatedPlot = response.Plot;
		truncatedPlot = truncatedPlot.substring(0,80) + "...";

		$("#movieGroup").remove();

		var movieGroup = $('<div class="card" id="movieGroup" style="width:18rem; margin-left:auto; margin-right:auto;">');
		$("#movie-results").append(movieGroup);
		var moviePosterContainer = $('<div id="moviePosterContainer" style="height:200px; overflow:hidden;">');
		movieGroup.append(moviePosterContainer);
		var moviePoster = $('<img class="card-img-top" src="' + response.Poster + '" alt="Card image cap">')
		moviePosterContainer.append(moviePoster);
		var movieCard = $('<div class="card-body">');
		movieGroup.append(movieCard);
		var movieName = $('<h5 class="card-title" style="border-bottom: 1px solid #d9d9d9; padding-bottom: 20px; font-size: 30px; text-align:center;">').text(response.Title);
		movieCard.append(movieName);
		var movieRow = $('<div class="row" id="this-is-a-test">');
		movieCard.append(movieRow);
		var columnOne = $('<div class="col-6">');
		movieRow.append(columnOne);
		var columnTwo = $('<div class="col-6">');
		movieRow.append(columnTwo);
		var movieRelease = $('<p class="card-text" id="movieRelease">').text(response.Released);
		columnOne.append(movieRelease);
		var movieDirector = $('<p class="card-text" id="movieActors">').text(response.Director);
		columnTwo.append(movieDirector);
		var moviePlot = $('<p class="card-text" id="moviePlot" style="text-align:left; padding-top:20px;">').text(truncatedPlot);
		movieCard.append(moviePlot);

		//var movieActors = $('<p class="card-text" id="movieActors">').text("Actors: " + response.Actors);
		//movieCard.append(movieActors);
		var movieAdd = $('<button type="button" class="btn btn-dark" data-toggle="modal" data-target="#addModal" id="rateMovie">Add Movie</button>');
		movieCard.append(movieAdd);
		$('#yourRatingTitle').text("Rate " + response.Title);
		$('#movieName').val(response.Title);
		$('#moviePoster').val(response.Poster);
		$('#moviePlot').val(response.Plot);
		$('#averageRating').val(averageRating);

	});


}


$("#add-movie").on("click", function(event) {
	event.preventDefault();
	displayMovieInfo();
});
