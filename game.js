var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;
var started=false;


//pressed value from keyboard to start/restart game
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});




// clicked button on screen
$(".btn").click(function (){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
   });

//  random pattern generated for game  
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    
    
}

// audio for each button
function playSound(name){
   var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

// function of animation on button
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
}


// checks the ans of user with pattern
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
      else {
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game over.Press a key to restart");
        startOver();
    }
}


// reseting the value for game to start again
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


    
  





















