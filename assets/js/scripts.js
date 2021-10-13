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

// record which question the user is currently at
var currentQuestion = 0;

// Questions and answers
var questions = [
    "",
    `<p>What is Javascript?</p> <div class="radio-choices"><button class="choiceBtn">GOD</button><button class="choiceBtn">I don't know</button><button class="choiceBtn">The knockoff Java</button><button class="choiceBtn">A programming language</button></div> `,
    `<p>What is Javascript?</p> <div class="radio-choices"><input type="radio" name="choice" id="correct-answer"><label for="rad1">A programming language</label> <input type="radio" name="choice" id="wrong-answer"><label for="rad1">A movie script</label>, <input type="radio" name="choice" id="wrong-answer"><label for="rad1">A coffee drink</label> <input type="radio" name="choice"><label for="rad1" id="wrong-answer">An Island</label></div> `,
    `<p>This is Question 3!</p>`,
    `<p>This is Question 4!</p>`,
    `<p>This is Question 5!</p>`
];




// timer function for 30 second time limit
// stop the timer if user either answers all 5 questions or fails to anser before time limit
function timerStart() {
    var timerInterval = setInterval(function() {
        timerCount.textContent = timeLeft;
        if (timeLeft === 0 || currentQuestion > 5) {
            document.querySelector("#stage").innerHTML = "<h1>GAME OVER!</h1>";
            clearInterval(timerInterval);
        }
        timeLeft--;

    }, 1000)
}

startButton.addEventListener("click", function(){
    // timerStart();
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
    console.log(currentQuestion);
    if (currentQuestion > 1 && currentQuestion < 6) {
        document.querySelector("#stage").innerHTML = questions[currentQuestion];
        document.querySelector("#stage").appendChild(nextButton);
    }
})



