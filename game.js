
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var lost = false;

$(document).keypress(function () { 
    if (!started){
        started=true;
        nextSequence();
        $(".level-title").text("Level "+level);

    }
});

function nextSequence() {

    userClickedPattern=[];
    level+=1;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    var interval = 600;

    gamePattern.forEach((color, index) => {
        setTimeout(function () {
          $("#" + color)
          .fadeOut(100)
          .fadeIn(100)
          .fadeOut(100)
          .fadeIn(100);
          playSound(color);
          console.log(index);
        },index* interval);  
      });

    
    
    $("#level-title").text("Level "+level);
  }

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
    if (started==true){
    playSound(userChosenColour);
    }
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed"); 
    },100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        
        if (gamePattern.length===userClickedPattern.length){
            setTimeout(nextSequence,1000);
        }
    }else{
        playSound("wrong");
        gameEnd();
        return false;
    }
    return true;

}

function gameEnd(){
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    started=false;
    level=0;
    gamePattern=[];
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}



