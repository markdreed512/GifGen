


// var JSONreadyTopics = JSON.stringify(topics)
// localStorage.setItem('topicsStr', JSONreadyTopics)
// topics = localStorage.getItem('topicsStr');//needs to be converted back from JSON I think


var topics = [
  "Game of Thrones", 
  "Breaking Bad", 
  "The Wire", 
  "Better Call Saul", 
  "Silicon Valley", 
  "The Good Place", 
  "Brooklyn 99", 
  "Seinfeld", 
  "The Walking Dead", 
  "Arrested Development"
]

var userInput = ""

function renderButtons(){
  
  for (var i = 0; i < topics.length; i++){
    var button = $('<button>').addClass('new-button')
    button.text(topics[i])
    $('#button-area').prepend(button)
  }
 
  
}

renderButtons()
var list = JSON.parse(localStorage.getItem("savedButtons"));
console.log("list on refresh: ", list)
if (!Array.isArray(list)) {
  list = [];
  console.log("now list is: ", list)
}
  //display var list from localStorage
for(var i = 0; i < list.length; i++){
  console.log(list.length)
  var loadedButton = $('<button>').addClass('new-button')
  console.log("loadedButton:" , loadedButton)
  loadedButton.text(list[i])
  $('#button-area').append(loadedButton)
  
  console.log("should have rendered buttons from storage")
}

$('#submit-btn').on('click', function(event){//add condition for empty input
  event.preventDefault();
  console.log("input: ", $('#user-input').val())
  if($('#user-input').val().length > 0){
    console.log("in")
    event.preventDefault()   
    userInput = $("#user-input").val().trim()
    var button = $('<button>').addClass('new-button')
    button.text(userInput)
    $('#button-area').append(button)
    $('#user-input').val('')
    list.push(userInput)
    console.log("list:" , list)
    localStorage.setItem('savedButtons', JSON.stringify(list));
  }

    
})

$(document).on('click', '.new-button', function(){
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=4lPzNQgi0E1cKkFOEX0d0GOjRmXH1zxz&q=" + this.innerHTML + "&limit=10&offset=0&rating=R&lang=en"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   for (var i = 0; i < response.data.length; i++){
     var imageContainer = $('<div>').attr('class', 'image-box');
     var image = $('<img>').attr({
      'src': response.data[i].images.original_still.url,
      'class': 'pic',
      'data-state': "still",
      'data-still-url': response.data[i].images.original_still.url,
      'data-animate-url': response.data[i].images.original.url
      });
      var lineBreak = $('<br>');
      var rating =  "Rating: " + response.data[i].rating.toUpperCase()
    
     imageContainer.append(rating, lineBreak, image)
     
     $('#gif-area').prepend(imageContainer).css("display", "block")

   }
   
    })
})
//when you click a pic it toggles on and off
$(document).on('click', '.pic', function(event){
  console.log(this)
  if ($(this).attr('data-state') === "still"){
    $(this).attr('src', $(this).attr('data-animate-url'));
    $(this).attr("data-state", "animate");
  }
  else{
    $(this).attr('src', $(this).attr('data-still-url'));
    $(this).attr("data-state", "still");
  }
})

  //my giphy key: 4lPzNQgi0E1cKkFOEX0d0GOjRmXH1zxz

  //it should:
  //1. DONE- add a button with the user text
  //2. DONE-populate gifs when clicked
  //3. check before creating button for empty input
  //4. DONE-use userInput from textbox
  //5. save previous buttons
  //6. DONE- add new gifs before old ones