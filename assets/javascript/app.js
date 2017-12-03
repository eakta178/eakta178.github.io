
//add timer
window.onload = function() {

  $("#start").on("click", game.start);
  
};
var intervalId;
var clockRunning = false;
var resultText;
var indx = 0;
var win=0;
var loss =0;
var noAns = 0;
var mytimeout;



//create an object with Trivia questions and answers

var game = {
	time: 30,
	triviaQuestions : ["What is the name of the main trainer in Pokemon?", "What is the name of the famous electric-type, yellow-coloured Pokémon that follows Ash around and refuses to enter a Poké ball?", "Who is Ash traveling with?", "This is a dark and ghost type Pokemon. It has jewels for eyes and razor sharp claws. It comes from the Hoenn region. Who's that Pokemon?"],

	triviaAnswers : [["Nidorino", "Pikachu", "Caterpie", "Ash"],["Nidorino", "Pikachu", "Caterpie", "Ash"],["Cilan", "Iris", "Iris and Cilan", "No One"],["Munchlax", "Charmander", "Sableye", "The Hairy Bug Pokemon"]],
  correctAnswers : ["Ash", "Pikachu", "Iris and Cilan", "Sableye"],
  imageAnswers : ['assets/images/Ashgiphy.gif', 'assets/images/Pikachugiphy.gif', 'assets/images/IrisCilangiphy.gif', 'assets/images/Sableyegiphy.gif'],

  start: function() {
        $('#start').remove();
        if (!clockRunning) {
        //var intervalId=setInterval(game.count,1000);
        intervalId=setInterval(game.count,1000);
        clockRunning = true;
        console.log('im inside start and current index is'+ indx)
        game.showOptions(indx,game.triviaQuestions[indx]);
        

  }
},

  showOptions: function(ind,questionname) {
console.log(questionname);
  	        
              $('#question').html(questionname);
              $('#options').empty();
              var len =game.triviaAnswers[ind].length;

        	      for (var j = 0; j < len; j++) {
        
				        var optionBtn = $("<button>");

				        optionBtn.addClass("btn btn-primary option");

				        optionBtn.attr("data-option",game.triviaAnswers[ind][j]);
				        
                optionBtn.text(game.triviaAnswers[ind][j]);

				        $("#options").append(optionBtn);
                $("#options").append('<br>');

              }
              console.log(game.time);
              mytimeout= setTimeout(function(){game.NoAnswer()},30000)
              
              // button click event to show the result
              $(".option").on('click', function() {
                //save selection in a variable
                var savedSelection= $(this).text();
                game.correctAnswer(savedSelection);
                game.showNextQuestion();
                
                
                });
		      	
               
  },

  correctAnswer: function(selectedOption){
    //compare button click with results
    console.log(selectedOption);
    
    if(selectedOption === game.correctAnswers[indx])
    
    {
      console.log('entered correct');
      win++;
      
      console.log(indx);
      resultText = "You are correct. The right answer is: "+ selectedOption;
      $('#options').empty();
      $("#options").html('<h3>'+ resultText + '</h3>');
      var imgURL = game.imageAnswers[indx];
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      $("#options").append(image);
      console.log(image)

    }
    else
    {
      loss++;
      console.log('entered incorrect');
      console.log(indx);
      resultText = "You are NOT correct. The right Answer is: "+ game.correctAnswers[indx];
      $('#options').empty();
      $("#options").html('<h3>'+ resultText + '</h3>');
      var imgURL = game.imageAnswers[indx];
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);
      
      // Appending the image
      $("#options").append(image);
    }
  }, 
  NoAnswer: function(){
    noAns++;
    console.log('entered unanswered');
    console.log(indx);
    resultText = "Time is up. The right Answer is: "+ game.correctAnswers[indx];
    $('#options').empty();
    $("#options").html('<h3>'+ resultText + '</h3>');
    var imgURL = game.imageAnswers[indx];
    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    
    // Appending the image
    $("#options").append(image);
    clearTimeout(mytimeout);
    
    game.showNextQuestion();
 
  },
  showNextQuestion: function(){
    //reset timer
    game.reset();
    indx++;
    if(indx>=game.triviaQuestions.length){
  
    setTimeout(function(){game.showFinalScreen()},3000)
    game.stop();
  
    }
    else{
    //move to next question
     console.log('next index is '+indx);
                  
    game.stop();
    setTimeout(function(){game.start()},3000)
                  
    }
  },
 
    count: function() {
    
	      game.time--;
	      var currentTime = game.timeConverter(game.time)
        $("#display").html('Time remaining: '+ currentTime);
        
	
  },

    stop: function() {
    console.log('i was inside stop');
    clearInterval(intervalId);
    clockRunning = false;
    clearTimeout(mytimeout);
    
  },

  restart: function(){
    
    indx=0;
    win=0;
    loss =0;
    noAns = 0;
    console.log('im inside restart and current index is ' + indx)
    console.log('im inside restart and current win is ' + win)
    console.log('im inside restart and current loss is ' + loss)
  },
  reset: function() {
    
    game.time=30;
    $("#display").text('Time remaining: '+ "00:00");

  },


    timeConverter: function(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  },
showFinalScreen : function(){
    setTimeout(game.stop(), 3000);
   
    $('#restart').attr("style", "display: visible");
    $('#restart').text('Start Over?');
    $('#restart').addClass("btn btn-success");
    $("#display").text('Time remaining: '+ "00:00");
    $('#question').html('<h2>'+ 'All Done, Here is is how you did!!!'+'</h2>');
    $('#options').html('<h3>'+ 'Correct Answers: '+ win +'<br>' +'</h3>');
    $('#options').append('<h3>'+ 'Not Correct Answers: '+ loss +'<br>' +'</h3>')
    $('#options').append('<h3>'+ 'Unasnswerd: '+ noAns +'<br>' +'</h3>')

    $('#options').append('<br>'+ '<br>');
    clearTimeout(mytimeout);
    $("#restart").on('click', function(){
      
      game.restart();
      game.start();
      $('#restart').hide();
      
      
    });
},
 
};










//add logic to compare 



//