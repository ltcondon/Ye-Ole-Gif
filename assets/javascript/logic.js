$(document).ready(function() {
    var newButton; // to be given click listener
    var buttonArea = $("#buttons"); // to be appended on search enter
    var gifArea = $("#images");
    var searchButton = $("#searchButton");
    var clearButton = $("#clear");
    var createButton; // to be assigned on click listener
    var gifCount; // to be assigned value of number of results specified
    var buttonColors = ["blue", "grey", "green", "orange", "cream"];  // array of css classes that will be randomly assigned upon button creation;
    var limit = "&limit=5";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
    var initialButtons = []; // initial buttons on page

    searchButton.click(function() {
        newButton = $("<button>")
        newButton.addClass(buttonColors[Math.floor(Math.random() * 6)]);
        newButton.addClass("gif-button");
        newButton.text($("#inputSearch").val());
        newButton.val($("#inputSearch").val());    
        buttonArea.append(newButton);
    })

    $(".gif-button").click(function() {
        var searchWord = $(this).val();
        console.log(searchWord);
        $.ajax({
            url: queryURL + searchWord + "t8uKuW8SvPkDbPqFlCUt7GyWA5IkhH5M&limit=4",
            method: "GET",
        }).then(function(response){
        for (var i = 0; i < 5; i++)
            console.log(response);
            var gifsToAdd = response.data[i].images.fixed_height.url
            console.log(gifsToAdd);
            gifArea.append(gifsToAdd);
        })
    })
})