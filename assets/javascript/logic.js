$(document).ready(function() {
    var newButton; // to be given click listener
    var buttonArea = $("#buttons"); // to be appended on search enter
    var leftArea = $("#left-images");
    var rightArea = $("#right-images");
    var gifCount = 0; // to be assigned value of number of results specified
    var buttonColors = ["blue", "grey", "green", "orange", "cream", "yellow"];  // array of css classes that will be randomly assigned upon button creation;
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
    var initialButtons = ["Frodo", "Gandalf", "Dumbledore"]; // initial buttons on page
    var gifLoaded = false;


    function generateButtons(array) {
        for (var i=0; i < array.length; i++) {
            newButton = $("<button>")
            newButton.addClass(buttonColors[Math.floor(Math.random() * 6)]);
            newButton.addClass("gif-button");
            newButton.text(array[i]);
            newButton.val(array[i]);    
            buttonArea.prepend(newButton); 
        }
    }
    $(document).ready(generateButtons(initialButtons))

    $(document).on('keypress',function(e) {
      if ((e.which == 13) && ($("#inputSearch").val() !== null)) {
        e.preventDefault()
        newButton = $("<button>")
        newButton.addClass(buttonColors[Math.floor(Math.random() * 6)]);
        newButton.addClass("gif-button");
        newButton.text($("#inputSearch").val());
        newButton.val($("#inputSearch").val());    
        buttonArea.append(newButton);
      }
    })

  $(document).on("click", ".gif-button", function() {
    $("#images").fadeOut();
      if (gifLoaded === false) {
        $(".open").hide();
        $("#buttons").css("max-width", "800px");
        $("#buttons").css("padding-left", "8%");
        $("#buttons").css("top", "+=23px");
        setTimeout(function() {
            $("#back-button").fadeIn();
        }, 350)
      }
        gifCount = 0;
        leftArea.empty();
        rightArea.empty();

        var searchWord = $(this).val();
        console.log(searchWord);
        $("#book-container").attr("id", "pages-container")
        
      setTimeout(function(){

        $.ajax({
            url: queryURL + searchWord + "&api_key=t8uKuW8SvPkDbPqFlCUt7GyWA5IkhH5M&limit=50",
            method: "GET",
        }).then(function(response){
            console.log(response);
            
        var random = Math.floor(Math.random() * 46)
        for (var i = random; i < random + 4; i++){
            // console.log(i, response.data[i].images.fixed_height_still.url)
            gifCount++;
            var gifToAdd = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                gifToAdd.addClass("gif");
                gifToAdd.addClass("img-fluid");
                gifToAdd.attr("data-animate", response.data[i].images.fixed_height.url);
                gifToAdd.attr("data-still", response.data[i].images.fixed_height_still.url);
                gifToAdd.attr("data-state", "still");
                
                if (gifCount < 3) {
                    leftArea.append(gifToAdd);
                    leftArea.append("<br><br>");
                }
                else {
                    rightArea.append(gifToAdd);
                    rightArea.append("<br><br>");
                }
            }
        })
      }, 500)

        setTimeout(function() {
            $("#images").fadeIn();
        }, 750)
        gifLoaded = true;
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
  $(document).on("click", "#back-button", function() {
    $("#images").css("display", "none");
    $(".open").fadeOut();
        $("#buttons").css("max-width", "400px");
        $("#buttons").css("padding-left", "0%");
        $("#buttons").css("top", "-=23px");
        $("#pages-container").attr("id", "book-container")
        $("#back-button").css("display", "none");
        setTimeout(function() {
            $(".open").fadeIn();
        }, 150)
        gifLoaded = false;
      })
  })
