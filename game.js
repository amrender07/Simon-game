var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#startbtn").click(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        $("#startbtn").slideUp(100);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel].length === userClickedPattern[currentLevel].length) {
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        $("#startbtn").slideDown(100);
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Button to Restart!");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}


function playSound(soundName) {
    var audio = new Audio("sounds/" + soundName + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




