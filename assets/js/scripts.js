// PSEUDOCODE:
// When user hits "Start Quiz", redirect to question-one webpage and start the 10 second timer

var startButton = document.querySelector("#start-button");
var timerCount = document.querySelector(".timer");
var timeLeft = 30;
var timer;
// logic for next button
var nextButton = document.createElement("button");
nextButton.setAttribute("id", "next-button");
nextButton.innerHTML = "Next"; 

var currentQuestion = 0;
var questions = [
    "",
    `<p>Question 1</p>`,
    `<p>This is Question 2!</p>`,
    `<p>This is Question 3!</p>`,
    `<p>This is Question 4!</p>`,
    `<p>This is Question 5!</p>`
];

// timer function for 30 second time limit
// stop the timer if user either answers all 5 questions or fails to anser before time limit
function timerStart() {
    timer = setInterval(function() {
        timerCount.textContent = timeLeft;
        if (timeLeft === 0 || currentQuestion > 5) {
            document.querySelector("#stage").innerHTML = "<h1>GAME OVER!</h1>";
            clearInterval(timeInterval);
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

