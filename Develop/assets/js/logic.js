// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 2;//CHANGE BACK TO 15
var timerId;
var currentQuestion;
var userScore = 0;
var timer;


// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var questionTitleEl = document.getElementById("question-title");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
// var addChoicesBtn = document.createElement("button");
var finalScoreEl = document.getElementById("final-score");
var userInitialsEl = document.getElementById("initials");

// var userAnswer;
// create user score var

var showHighScores;



// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
    startScreenEl.className ="hide";

  // un-hide questions section
    questionsEl.className ="start";

  // start timer
  timer = setInterval(clockTick, 1000);
  getQuestion();
};


//need to clean this up

function getQuestion() {
  // get current question object from array, 
  currentQuestion = questions[currentQuestionIndex];
  // update title with current question
  questionTitleEl.textContent = currentQuestion.title;
  
  //clear old question choices
  choicesEl.innerHTML = "";

  // loop over choices
  for (var i =0; i < currentQuestion.choices.length; i++){
    console.log(currentQuestion.choices[i]);

// create new button for each choice
    var addChoicesBtn = document.createElement("button");
    addChoicesBtn.textContent = currentQuestion.choices[i];
    addChoicesBtn.className = currentQuestion.choices[i];
    
    //event listener
    addChoicesBtn.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(addChoicesBtn);
    };
  };


function questionClick() {
  // The stopPropagation() method prevents propagation of the same event from being called.
  event.stopPropagation();

  // console.log(event.target.textContent);
  // check if user guessed correctly(event.target class activity)
  
  
  if (event.target.textContent === currentQuestion.answer){

    // play "right" sound effect
    sfxRight.play();

      // add 10 points
    userScore += 10;
    choicesEl.innerHTML = "YOU'RE CORRECT! 10 POINTS";
    choicesEl.style.color = "green";

  } else {
    // penalize time
    time = time - 10;

    // play "wrong" sound effect
    sfxWrong.play();
    choicesEl.innerHTML = "WRONG! LOSE TEN POINTS";
    choicesEl.style.color = "red";
  };

  

  // move to next question (currentQ I ++)
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex > questions.length -1){
    setTimeout(quizEnd, 400);
  }
  // else getQ again
  else{
    getQuestion;
  }
    
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);


  // show end screen change classes on div to hide and end screen show 
  endScreenEl.classList.remove("hide");

  // show final score .textContent
  userScore.textContent

  // hide questions section
  questions.classList.add("hide");
}


//   // check if user ran out of time
// }

function saveHighscore() {
  // get value of input box

  // make sure value wasn't empty
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user

    // save to localstorage

    // redirect to next page scores html

}

function checkForEnter(event) {
  // check if event key is enter
    // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
