// PSEUDOCODE:
// When user hits "Start Quiz", redirect to question-one webpage and start the 30 second timer
// When user is on question 1, user has 4 choices to choose from
// if user hits next and chooses wrong answer, should briefly show "Wrong!" message and subtract 5 seconds from timer
// if user chooses correct answer, should briefly show "Correct!" message and increment users score by 5 points
// if user answers all questions before timer or time expires, should see "Game Over!" and user's score
// at the end of the game, user should enter initials and save statistics.
// in Highscore webpage, user should see the user with highest score and be given option to clear
var startButton = document.querySelector("#start-button");
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

// record which question the user is currently at
var currentQuestion = 0;

// record the score user gets
var score = 0;

// Questions and answers
// assign wrong answers "wrong-answer" and right answers "right-answer"
var questions = [
    "",
    `<h2>What is Javascript?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">GOD</button><button class="choiceBtn wrong-answer">I don't know</button><button class="choiceBtn wrong-answer">The knockoff Java</button><button class="choiceBtn correct-answer">A programming language</button></div> `,
    `<h2>Which of the following is not a Javascript method?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">.split()</button><button class="choiceBtn wrong-answer">.join()</button><button class="choiceBtn correct-answer">.print()</button><button class="choiceBtn wrong-answer">.includes()</button></div> `,
    `<h2>How to declare a while loop to count from 0 to 10?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">while i=1 to 10</button><button class="choiceBtn correct-answer">while (i <= 10)</button><button class="choiceBtn wrong-answer">while (i <= 10; i++)</button><button class="choiceBtn wrong-answer">while i > 0 && i < 11</button></div> `,
    `<h2>Which index is the starting value in a list?</h2> <div class="multiple-choices"><button class="choiceBtn wrong-answer">-1</button><button class="choiceBtn correct-answer">0</button><button class="choiceBtn wrong-answer">1</button><button class="choiceBtn wrong-answer">2</button></div> `,
    `<h2>What keyword is used to skip loop iteration?</h2> <div class="multiple-choices"><button class="choiceBtn correct-answer">continue</button><button class="choiceBtn wrong-answer">break</button><button class="choiceBtn wrong-answer">next</button><button class="choiceBtn wrong-answer">skip</button></div> `
];


// timer function for 30 second time limit
// stop the timer if user either answers all 5 questions or fails to answer before time limit


function timerStart() {
    var timerInterval = setInterval(function() {
        timerCount.textContent = timeLeft;
        if (timeLeft === 0 || currentQuestion > 5) {
            storePlayerInfo();
            clearInterval(timerInterval);
        }
        timeLeft--;

    }, 1000)
}

// function to store player's score and initials at the end of the game
function storePlayerInfo() {
    document.querySelector("#stage").innerHTML = "<h3>Your total score is: </h3>" + score;
    formSubmit.appendChild(initialsBox);
    formSubmit.appendChild(initialsButton);
    document.querySelector("#stage").appendChild(formSubmit);

    // when user enters initials and hits submit, store player's score and initials
    initialsButton.addEventListener("click", function(event) {
        event.preventDefault();
        var playerInitials = document.querySelector("#initials");
        var playerInfo = {

            // .trim() removes spaces in between
            // only show the first 3 letters
            playerInitials: playerInitials.value.trim().slice(0,3),
            playerScore: score
          };
        
          localStorage.setItem("playerInfo", JSON.stringify(playerInfo));
          var lastPlayerInfo = JSON.parse(localStorage.getItem("playerInfo"))
        //   redirect to main page after player enters initials
          location.href = 'index.html';

    })
}


// function to record if user answered question correctly or not
// if correct, increase score by 10 points else if incorrect, decrease timer by 10 seconds

startButton.addEventListener("click", function(){
    // timerStart();
    currentQuestion++;
    
    // ensure we see questions 1 to 5

    if (currentQuestion > 0 && currentQuestion < 6) {
        document.querySelector("#stage").innerHTML = questions[currentQuestion];
        var multipleChoices = document.querySelector(".multiple-choices");
        multipleChoices.addEventListener("click", function(event){
        var element = event.target;
        console.log(element);
        if (element.matches(".correct-answer")) {
            console.log("CORRECT!")
            currentQuestion++;
            document.querySelector("#stage").innerHTML = questions[currentQuestion];
            }
        else {
            console.log("WRONG!")
            currentQuestion++;
            
            }
        })    
    }

    else if (currentQuestion > 5) {
        storePlayerInfo();
    }
})



