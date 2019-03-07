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

    $(document).on('keypress',function(e) {
      if ((e.which == 13) && ($("#inputSearch").val() !== null)) {
        e.preventDefault()
        newButton = $("<button>")
        newButton.addClass(buttonColors[Math.floor(Math.random() * 7)]);
        newButton.addClass("gif-button");
        newButton.text($("#inputSearch").val());
        newButton.val($("#inputSearch").val());    
        buttonArea.append(newButton);
      }
    })

  $(document).on("click", ".gif-button", function() {
        gifArea.empty();
        var searchWord = $(this).val();
        console.log(searchWord);
        $("#book-container").attr("id", "pages-container")
        
        
        $.ajax({
            url: queryURL + searchWord + "&api_key=t8uKuW8SvPkDbPqFlCUt7GyWA5IkhH5M&limit=4",
            method: "GET",
        }).then(function(response){
            console.log(response);

        for (var i = 0; i < 4; i++){
            // console.log(i, response.data[i].images.fixed_height_still.url)
            var gifToAdd = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                gifToAdd.addClass("gif");
                gifToAdd.attr("data-animate", response.data[i].images.fixed_height.url);
                gifToAdd.attr("data-still", response.data[i].images.fixed_height_still.url);
                gifToAdd.attr("data-state", "still");
                gifArea.append(gifToAdd);
        }
            
        })
    });

  $(document).on("click", ".gif", function() {

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
