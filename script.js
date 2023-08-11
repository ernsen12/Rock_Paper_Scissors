// onLoad
$(document).ready(function() {
    $("#battle_screen").hide();
});

// rules toggle
const ruleButton = $(".btn_rule");
const ruleClose = $(".rules_close")
const ruleWindow = $("#rules");

ruleButton.on("click", function() {
    ruleWindow.toggleClass("rule_display");
});

ruleClose.on("click", function() {
    ruleWindow.toggleClass("rule_display");
});

// game
const gameRules = {
    "paper" : "rock",
    "scissor" : "paper",
    "rock" : "scissor"
};

const gamePiece = ["paper", "scissor", "rock"];
const gameBtn = $(".game_btn");
let randomIndex = -1;
let score = 0;
const delay = 1000;
// playerpick
const playerPick = function(element){
    $(element).clone().appendTo("#player1");
    $("<div>").html("YOU PICKED").addClass("picked").appendTo("#player1");
    $("<div>").addClass("p2_placeholder").appendTo("#player2");
};

const housePick = (element) => {
    $("#player2").empty();
    $("#" + gamePiece[randomIndex]).clone().appendTo("#player2"); 
    $("<div>").html("THE HOUSE PICKED").addClass("picked").appendTo("#player2");
};

// execute game rules after picking
const gameImp = (element) => {
    if(gameRules[$(element).attr('id')] === gamePiece[randomIndex]){
        score++;
        $(".score").html(score);
        $("#player1").children(":first").addClass("win");
        $(".result").html("YOU WIN");
        
    }
    else if($(element).attr('id') === gamePiece[randomIndex]){
        $(".result").html("TIE");
    }
    else{
        score--;
        $(".score").html(score);
        $("#player2").children(":first").addClass("win");
        $(".result").html("YOU LOSE");
    }
    $(".result_container").show();
}
 
// game execution
const gameFunc = function(element){
    // game clone
    $(element).on("click", () => { 
        $("#main_screen").hide();
        $("#battle_screen").show();
        $(".result_container").hide();
        randomIndex = Math.floor(Math.random() * 3);
        
        // player pick
        playerPick(element);
        // housepick
        setTimeout(() => housePick(element), delay);
        // execute game  
        setTimeout(() => gameImp(element), delay);
    });   
};

gameBtn.each((index, element) => {
    gameFunc(element);
});

$(".play_again").on("click", () => {
    $("#player1").empty();
    $("#player2").empty();
    $("#main_screen").show();
    $("#battle_screen").hide();
});


