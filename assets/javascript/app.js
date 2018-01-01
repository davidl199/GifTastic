// Initial array of animals
//var topics = ["Dog", "Cat", "Chicken"];
var topics = ["football","baseball","hockey","soccer","Running", "skiing", "swimming"];
var objSports = [];

// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

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
        var result = $("#animals-view");
        result.empty();
        for (var i = 0; i < limit; i++) {
            var imageDiv = $("<div>")
            imageDiv.addClass("imgItem");
            var rating = $("<h4>").text("Rating: " + response.data[i].rating);
            var img = $("<img/>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            //img.attr("src", response.data[i].images.original_still.url);
            //img.attr("src", response.data[i].images.downsized_still.url);
            //img.attr("width",350);
            //img.attr("height",300);
            img.attr("data-name", response.data[i].id);
            img.addClass("animalGif");

            imageDiv.append(rating);
            imageDiv.append(img);
            result.append(imageDiv);

            //small size in KB
            //objAnimals.push({ id: response.data[i].id, StillImage: response.data[i].images.downsized_still.url, GifImage: response.data[i].images.downsized_medium.url, animated: false })
            //big size in KB
            //objAnimals.push({ id: response.data[i].id, StillImage: response.data[i].images.original_still.url, GifImage: response.data[i].images.original.url, animated: false })
            //fixed height
            objSports.push({ id: response.data[i].id, StillImage: response.data[i].images.fixed_height_still.url, GifImage: response.data[i].images.fixed_height.url, animated: false })
        }
        //console.log(response);
        //console.log(objAnimals);
        renderButtons();
    });

}

//Animate or stop amimation on GIF
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
    // A way to pull just the image by ID
    /* var image = $(this);
    var queryURL = "https://api.giphy.com/v1/gifs/" + gif + "?api_key=dc6zaTOxFJmzC";

    // Creates AJAX call for the specific animal image being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        
        image.attr("src",response.data.images.original_still.url);
            
        console.log(response);
    }); */
}

// Function for displaying animal data
function renderButtons() {

    // Deletes the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generates buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of animal to our button
        a.addClass("animal");
        // Added a data-attribute
        a.attr("data-name", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var sport = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);
$(document).on("click", ".animalGif", displayGif);


// Calling the renderButtons function to display the intial buttons
renderButtons();