
var timerCount = document.querySelector(".timer");
var timeLeft = 30;
var timer;

// form element to hold input box and form submit
var formSubmit = document.createElement("form");

// button allows player to store score and initials at end of the game with score
// any button inside of a form element is treated like a submit button
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
    `<h2>What is Javascript?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">GOD</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">I don't know</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">The knockoff Java</button><button class="choiceBtn correct-answer" onclick="checkAnswer(event)">A programming language</button></div> `,
    `<h2>Which of the following is not a Javascript method?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">.split()</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">.join()</button><button class="choiceBtn correct-answer" onclick="checkAnswer(event)">.print()</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">.includes()</button></div> `,
    `<h2>How to declare a while loop to count from 0 to 10?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">while i=1 to 10</button><button class="choiceBtn correct-answer" onclick="checkAnswer(event)">while (i <= 10)</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">while (i <= 10; i++)</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">while i > 0 && i < 11</button></div> `,
    `<h2>Which index is the starting value in a list?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">-1</button><button class="choiceBtn correct-answer" onclick="checkAnswer(event)">0</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">1</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">2</button></div> `,
    `<h2>What keyword is used to skip loop iteration?</h2> <div class="multiple-choices"><button class="choiceBtn correct-answer" onclick="checkAnswer(event)">continue</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">break</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">next</button><button class="choiceBtn wrong-answer" onclick="checkAnswer(event)">skip</button></div> `
];

// function to store player's score and initials at the end of the game
function storePlayerInfo() {
    document.querySelector("#stage").innerHTML = "<h3>Your total score is: </h3>" + score;
    formSubmit.appendChild(initialsBox);
    formSubmit.appendChild(initialsButton);
    document.querySelector("#stage").appendChild(formSubmit);


    // when user enters initials and hits submit, store player's score and initials
    initialsButton.addEventListener("click", function(event) {
        // Submitting a form by default resets the page.
        // Prevent the default behavior.
        event.preventDefault();
        var playerInitials = document.querySelector("#initials");
        var playerInfo = {

            // .trim() removes spaces in between
            // only show the first 3 letters
            playerInitials: playerInitials.value.trim().slice(0,3),
            playerScore: score
          };
        
          localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
        //   redirect to high score page and show player's initials/high score
        // since redirecting to another page, does not consider code after line 71
        location.href = 'high-score.html';

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

//high score button
var highScoreButton = document.querySelector("#high-score");

if (highScoreButton) {
    highScoreButton.addEventListener("click", function () {
        location.href = '/high-score.html';
    })
}


// start the quiz and record whether user made correct or incorrect choice
var startButton = document.querySelector("#start-button");
if (startButton !== null) {
    startButton.addEventListener("click", function(){
        currentQuestion++;
        timerStart();
        document.querySelector("#stage").innerHTML = questions[currentQuestion];
        
    })
}

// verify if player clicked on correct or incorrect answer
function checkAnswer(event) {
    var element = event.target;
    if (element.matches(".correct-answer")) {
        console.log("CORRECT!")
        score += 10;
        scoreTotal.textContent = score;
        currentQuestion++;
        document.querySelector("#stage").innerHTML = questions[currentQuestion] || `<h1>GAME OVER!</h1>`;
        }
    else {
        console.log("WRONG!")
        score -= 10;
        scoreTotal.textContent = score;
        timeLeft -= 5;
        currentQuestion++;
        document.querySelector("#stage").innerHTML = questions[currentQuestion] || `<h1>GAME OVER!</h1>`;
        }
    //What if there are no more questions?
}

// run if only on high score page
function displayScore() {
    // grab information from local storage containing score and initials
    var lastPlayerInfo = JSON.parse(localStorage.getItem("playerInfo"))
    // add latest score to high scores page if it exists
    if (lastPlayerInfo !== null) {
        document.querySelector(".user-score").innerHTML = lastPlayerInfo.playerScore;
        document.querySelector(".user-initials").innerHTML = lastPlayerInfo.playerInitials;
    }
}

// add the last score and initial ONLY on the high score.html webpage
if (location.href.includes("high-score.html")) {
    displayScore();
}

console.log(location.href);





