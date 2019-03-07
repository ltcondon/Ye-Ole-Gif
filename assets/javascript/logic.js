$(document).ready(function() {
    var newButton; // to be given click listener
    var buttonArea = $("#buttons"); // to be appended on search enter
    var gifArea = $("#images");
    var searchButton = $("#searchButton");
    var clearButton = $("#clear");
    var createButton; // to be assigned on click listener
    var gifCount; // to be assigned value of number of results specified
    var buttonColors = ["blue", "grey", "green", "orange", "cream", "yellow"];  // array of css classes that will be randomly assigned upon button creation;
    var limit = "&limit=5";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
    var initialButtons = []; // initial buttons on page

    searchButton.click(function() {
        newButton = $("<button>")
        newButton.addClass(buttonColors[Math.floor(Math.random() * 7)]);
        newButton.addClass("gif-button");

        newButton.text($("#inputSearch").val());
        newButton.val($("#inputSearch").val());    
        buttonArea.append(newButton);
    })
  $(document).on("click", ".gif-button", function() {

        var searchWord = $(this).val();
        console.log(searchWord);
        $("#book-container").attr("id", "pages-container")
        $.ajax({
            url: queryURL + searchWord + "&api_key=t8uKuW8SvPkDbPqFlCUt7GyWA5IkhH5M&limit=4",
            method: "GET",
        }).then(function(response){
        for (var i = 0; i < 5; i++)
            console.log(response);
            var gifToAdd = $("<img>").attr(response.data[i].images.fixed_height_still.url);
            console.log(gifToAdd);
            gifArea.append(gifToAdd);
        })

    var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    })
