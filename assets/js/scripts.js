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

// logic for next button
var nextButton = document.createElement("button");
nextButton.setAttribute("id", "next-button");
nextButton.innerHTML = "Next"; 

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


// record which question the user is currently at
var currentQuestion = 0;

// record the score user gets
var score = 120;
var scoreTotal = document.createElement("span");

// Questions and answers
var questions = [
    "",
    `<h2>What is Javascript?</h2> <div class="multiple-choices"><button class="choiceBtn">GOD</button><button class="choiceBtn">I don't know</button><button class="choiceBtn">The knockoff Java</button><button class="choiceBtn">A programming language</button></div> `,
    `<h2>Which of the following is not a Javascript method?</h2> <div class="multiple-choices"><button class="choiceBtn">.split()</button><button class="choiceBtn">.join()</button><button class="choiceBtn">.print()</button><button class="choiceBtn">.includes()</button></div> `,
    `<h2>How to declare a while loop to count from 0 to 10?</h2> <div class="multiple-choices"><button class="choiceBtn">while i=1 to 10</button><button class="choiceBtn">while (i <= 10)</button><button class="choiceBtn">while (i <= 10; i++)</button><button class="choiceBtn">while i > 0 && i < 11</button></div> `,
    `<h2>How do you use DOM to select the ID element '#header'?</h2> <div class="multiple-choices"><button class="choiceBtn">document.selector("#header")</button><button class="choiceBtn">document.ID("#header")</button><button class="choiceBtn">document.ID = ("#header")</button><button class="choiceBtn">document.querySelector("#header")</button></div> `,
    `<h2>What keyword is used to skip loop iteration?</h2> <div class="multiple-choices"><button class="choiceBtn">continue</button><button class="choiceBtn">break</button><button class="choiceBtn">next</button><button class="choiceBtn">skip</button></div> `
];




// timer function for 30 second time limit
// stop the timer if user either answers all 5 questions or fails to answer before time limit
function timerStart() {
    var timerInterval = setInterval(function() {
        timerCount.textContent = timeLeft;
        if (timeLeft === 0 || currentQuestion > 5) {
            document.querySelector("#stage").innerHTML = "<h3>Your total score is: </h3>" + score;
            formSubmit.appendChild(initialsBox);
            formSubmit.appendChild(initialsButton);
            document.querySelector("#stage").appendChild(formSubmit);
            clearInterval(timerInterval);
        }
        timeLeft--;

    }, 1000)
}

startButton.addEventListener("click", function(){
    timerStart();
    currentQuestion++;
    // turn start button to next button if we are on either questions 1 to 5

    if (currentQuestion !== 0) {
        console.log(currentQuestion);
        document.querySelector("#stage").innerHTML = questions[currentQuestion];
        // add the next button
        document.querySelector("#stage").appendChild(nextButton);

    }
})

nextButton.addEventListener("click", function() {
    currentQuestion++;
    // logic for if we are on 2nd to 5th question
    if (currentQuestion > 1 && currentQuestion < 6) {
        document.querySelector("#stage").innerHTML = questions[currentQuestion];
        document.querySelector("#stage").appendChild(nextButton);
    }
})



