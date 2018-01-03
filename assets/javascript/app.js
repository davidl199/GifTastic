// Initial array of topics
var topics = ["football", "baseball", "basketball", "boxing", "cycling", "hockey", "soccer", "golf", "skiing", "surfing", "rugby"];
// Array of objects to hold the current sport selected
var objSports = [];

// displaySportInfo function re-renders the HTML to display the appropriate content
function displaySportInfo() {
    var sport = $(this).attr("data-name");
    var limit = 10;
    objSports = [];
    //GIPHY public beta api key -- dc6zaTOxFJmzC
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var result = $("#sports-view");
        result.empty();
        // Dynamically add the sport gifs to the page
        for (var i = 0; i < limit; i++) {
            var imageDiv = $("<div>")
            imageDiv.addClass("imgItem");
            var rating = $("<h4>").text("Rating: " + response.data[i].rating);
            var img = $("<img/>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-name", response.data[i].id);
            img.addClass("sportGif");

            imageDiv.append(rating);
            imageDiv.append(img);
            result.append(imageDiv);

            objSports.push({ id: response.data[i].id, StillImage: response.data[i].images.fixed_height_still.url, GifImage: response.data[i].images.fixed_height.url, animated: false })
        }
    });

}

//function to Animate or stop amimation on GIF
function displayGif() {
    var gif = $(this).attr("data-name");
    var imageSource = $(this);
    for (var i = 0; i < objSports.length; i++) {
        if (objSports[i].id == gif) {
            if (objSports[i].animated == false) {
                imageSource.attr("src", objSports[i].GifImage);
                objSports[i].animated = true;
            }
            else {
                imageSource.attr("src", objSports[i].StillImage);
                objSports[i].animated = false;
            }
        }
    }
}

// Function for displaying sports data
function renderButtons() {

    // Deletes the sports buttons prior to adding new sports
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of sports
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each sport in the array
        var a = $("<button>");
        a.addClass("sport");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add sports button is clicked
$("#add-sport").on("click", function (event) {
    event.preventDefault();

    var sport = $("#sport-input").val().trim();
    if (sport) {
        topics.push(sport);
        renderButtons();
    }
});

// Add click event listeners to all elements with a class of sport
$(document).on("click", ".sport", displaySportInfo);
$(document).on("click", ".sportGif", displayGif);


// Calling the renderButtons function to display the intial buttons
renderButtons();