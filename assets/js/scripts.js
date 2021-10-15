
var timerCount = document.querySelector(".timer");
var timeLeft = 30;
var timer;

// form element to hold input box and form submit
var formSubmit = document.createElement("form");

// button allows player to store score and initials at end of the game with score
var initialsButton = document.createElement("button");
initialsButton.setAttribute("id", "add-initials");
initialsButton.innerHTML = "Add Initials"; 

// input box where player can add their initials at the end of the game
var initialsBox = document.createElement("INPUT");
initialsBox.setAttribute("type", "text");
initialsBox.setAttribute("name", "initials");
initialsBox.setAttribute("id", "initials");
initialsBox.setAttribute("placeholder", "AAA");


// button for main home page
var homeButton = document.querySelector("#go-back-button")
console.log(homeButton)
// button to clear statistics
var clearButton = document.querySelector("#clear-button")

// record which question the user is currently at
var currentQuestion = 0;

// record the score user gets
var score = 0;
var scoreTotal = document.querySelector(".score");
// Questions and answers
// assign wrong answers "wrong-answer" and right answers "right-answer"
var questions = [
    "",
    `<h2>What is Javascript?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer()">GOD</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">I don't know</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">The knockoff Java</button><button class="choiceBtn correct-answer" onclick="checkAnswer()">A programming language</button></div> `,
    `<h2>Which of the following is not a Javascript method?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer()">.split()</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">.join()</button><button class="choiceBtn correct-answer" onclick="checkAnswer()">.print()</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">.includes()</button></div> `,
    `<h2>How to declare a while loop to count from 0 to 10?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">while i=1 to 10</button><button class="choiceBtn correct-answer" onclick="checkAnswer()">while (i <= 10)</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">while (i <= 10; i++)</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">while i > 0 && i < 11</button></div> `,
    `<h2>Which index is the starting value in a list?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer()">-1</button><button class="choiceBtn correct-answer" onclick="checkAnswer()">0</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">1</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">2</button></div> `,
    `<h2>What keyword is used to skip loop iteration?</h2> <div class="multiple-choices"><button class="choiceBtn correct-answer" onclick="checkAnswer()">continue</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">break</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">next</button><button class="choiceBtn wrong-answer" onclick="checkAnswer()">skip</button></div> `
];

// function to store player's score and initials at the end of the game
function storePlayerInfo() {
    document.querySelector("#stage").innerHTML = "<h3>Your total score is: </h3>" + score;
    formSubmit.appendChild(initialsBox);
    formSubmit.appendChild(initialsButton);
    document.querySelector("#stage").appendChild(formSubmit);

    // when user enters initials and hits submit, store player's score and initials
    initialsButton.addEventListener("click", function() {
        // event.preventDefault();
        var playerInitials = document.querySelector("#initials");
        var playerInfo = {

            // .trim() removes spaces in between
            // only show the first 3 letters
            playerInitials: playerInitials.value.trim().slice(0,3),
            playerScore: score
          };
        
          localStorage.setItem("playerInfo", JSON.stringify(playerInfo));

        //   redirect to high score page and show player's initials/high score
          location.href = '/high-score.html';
          var lastPlayerInfo = JSON.parse(localStorage.getItem("playerInfo"))
          if (lastPlayerInfo !== null) {
              document.querySelector(".user-score").innerHTML = lastPlayerInfo.playerScore;
              document.querySelector(".user-initials").innerHTML = lastPlayerInfo.playerInitials;
          }

    })
}
// timer function for 30 second time limit
// stop the timer if user either answers all 5 questions or fails to answer before time limit


function timerStart() {
    var timerInterval = setInterval(function() {
        timerCount.textContent = timeLeft;
        // if timer falls below 0, set timer to 0
        if (timeLeft < 0) {
            timeLeft = 0;
            timerCount.textContent = timeLeft;
        }
        if (timeLeft <= 0 || currentQuestion > 5) {
            storePlayerInfo();
            clearInterval(timerInterval);
        }
        timeLeft--;

    }, 1000)
}

// high score button
var highScoreButton = document.querySelector("#high-score");

highScoreButton.addEventListener("click", function () {
    location.href = '/high-score.html';
})


// start the quiz and record whether user made correct or incorrect choice
var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", function(){
    currentQuestion++;
    timerStart();
    document.querySelector("#stage").innerHTML = questions[currentQuestion];
    
})

// verify if player clicked on correct or incorrect answer
function checkAnswer() {
    var multipleChoices = document.querySelector(".multiple-choices");   
    multipleChoices.addEventListener("click", function(event){
        var element = event.target;
        if (element.matches(".correct-answer")) {
            console.log("CORRECT!")
            score += 10;
            scoreTotal.textContent = score;
            currentQuestion++;
            document.querySelector("#stage").innerHTML = questions[currentQuestion];
            }
        else {
            console.log("WRONG!")
            score -= 10;
            scoreTotal.textContent = score;
            timeLeft -= 5;
            currentQuestion++;
            document.querySelector("#stage").innerHTML = questions[currentQuestion];

            
            }
        }) 
}





