$(document).ready(function() {
    var newButton; // to be given click listener
    var buttonArea = $("#buttons"); // to be appended on search enter
    var leftArea = $("#left-images");
    var rightArea = $("#right-images");
    var gifCount = 0; // to be assigned value of number of results specified
    var buttonColors = ["blue", "grey", "green", "orange", "cream", "yellow"];  // array of css classes that will be randomly assigned upon button creation;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
    var initialButtons = ["Frodo", "Gandalf", "Dumbledore"]; // initial buttons on page
    var gifLoaded = false;

    // initial buttons are deployed to page on load:
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


    // when a the enter key is pressed:

    $(document).on('keypress',function(e) {
      // as long as the input-form is not blank:
      if ((e.which == 13) && ($("#inputSearch").val() !== null)) {
        e.preventDefault()
        // a new button is created and given several attributes:
        newButton = $("<button>")
        newButton.addClass(buttonColors[Math.floor(Math.random() * 6)]);
        newButton.addClass("gif-button");

        // and assigned a value corresponding to the term that was searched:
        newButton.text($("#inputSearch").val());
        newButton.val($("#inputSearch").val());  
        
        // and is finally appended to the button area at the top of the page:
        buttonArea.append(newButton);
      }
    })

  //when one of these ".gif-buttons" is clicked:
  $(document).on("click", ".gif-button", function() {
    
    //some animations happen (somwe only if gifs have not been previously loaded):
    $("#images").fadeOut();
    $("#book-container").attr("id", "pages-container")

      if (gifLoaded === false) {
        $(".open").hide();
        $("#buttons").css("max-width", "800px");
        $("#buttons").css("padding-left", "8%");
        $("#buttons").css("top", "+=23px");
        setTimeout(function() {
            $("#back-button").fadeIn();
        }, 350)
      }

      // number of gifs generated is set to begin at zero:
        gifCount = 0;

        // image areas are emptied out any previously generated results:
        leftArea.empty();
        rightArea.empty();

      // keying in the value of what kind of GIFs to pull from the API based on the button clicked:
        var searchWord = $(this).val();
        console.log(searchWord);
      

      // after allowing a moment for our animations to occur, we trigger the ajax call:
      setTimeout(function(){

        $.ajax({
            url: queryURL + searchWord + "&api_key=t8uKuW8SvPkDbPqFlCUt7GyWA5IkhH5M&limit=50",
            method: "GET",
        }).then(function(response){
            console.log(response);
        

        // using a random number here allows for some 'pseudo-randomness', as we initially pull 50 gifs:
        var random = Math.floor(Math.random() * 46)

        // for 4 random gifs out of our results:
        for (var i = random; i < random + 4; i++){
            gifCount++;  // we increase our gifCount variable each time run through the loop

            // we generate a new <img>, give it a src url, and still/animated url attributes:
            var gifToAdd = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                gifToAdd.addClass("gif");
                gifToAdd.addClass("img-fluid");
                gifToAdd.attr("data-animate", response.data[i].images.fixed_height.url);
                gifToAdd.attr("data-still", response.data[i].images.fixed_height_still.url);
                gifToAdd.attr("data-state", "still");
                

                // our first two gifs are appended to the left side of the page:
                if (gifCount < 3) {
                    leftArea.append(gifToAdd);
                    leftArea.append("<br><br>");
                }
                // and our second pair appended to the right side:
                else {
                    rightArea.append(gifToAdd);
                    rightArea.append("<br><br>");
                }
            }
        })
      }, 500)

        // once these gifs are generated and appended to the page, our 'image display' area is faded in:
        setTimeout(function() {
            $("#images").fadeIn();
        }, 750)

        // and our 'gifsLoaded' variable set to true
        gifLoaded = true;
    });


  // when a gif is clicked:
  $(document).on("click", ".gif", function() {

    //we grab ahold of its 'state' attribute (still or animated):
    var state = $(this).attr("data-state");
     
    // and animate the gif if it is currently in still state:
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

      // or freeze the gif if it is currently in the 'animated' state:
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  // when the back button is clicked (it was faded in upon a gif search):
  $(document).on("click", "#back-button", function() {

    // animations and css stylings triggered by a gif search are reversed:
    $("#images").css("display", "none");
    $(".open").fadeOut();
        $("#buttons").css("max-width", "400px");
        $("#buttons").css("padding-left", "0%");
        $("#buttons").css("top", "-=23px");
        $("#pages-container").attr("id", "book-container")
        $("#back-button").css("display", "none");
        
        // our 'opener' page is re-displayed:
        setTimeout(function() {
            $(".open").fadeIn();
        }, 150)

        // and our gifLoaded variable is set back to false.
        gifLoaded = false;
      })
  })
