// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;//CHANGE BACK TO 15
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
  timer = setInterval(timerMove, 1000);
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
    setTimeout(quizEnd, 700);

  }// else getQ again
    else{
    setTimeout(getQuestion, 700);
  }; 
};

function quizEnd() {
  // stop timer
  clearInterval(timer);
  timerEl.textContent = 0;

  finalScoreEl.textContent = userScore;

  // hide questions section
  questionsEl.className = "hide";

  // show end screen change classes on div to hide and end screen show 
  endScreenEl.className = "start";
};


//   // check if user ran out of time
// 

function timerMove() {
  time--;
    timerEl.textContent = time;
    if (time <= 0){
      quizEnd();
    };
};

function saveHighscore() {
  // get value of input box
  var userInitials = userInitialsEl.value;

  // make sure value wasn't empty
  if (userInitials === ""){
    alert("OOPS! Please add initials to compare scores");
  };
    // get saved scores from localstorage, or if not any, set to empty array
  showHighScores = JSON.parse(localStorage.getItem("High Scores"));

  if (showHighScores === null){
    showHighScores = [];
  };

    // format new score object for current user
  var user ={
    Initials: userInitials,
    Score: userScore,
  };

    // save to localstorage
    showHighScores.push(user);

    localStorage.setItem("High Scores", JSON.stringify(showHighScores));

    // redirect to next page scores html
    window.location.href = "./highscores.html";

    printHighScores();

}

function checkForEnter(event) {
  event.preventDefault();
  if (event.keyCode === 13){
    saveHighscore();
  };
  // check if event key is enter
    // saveHighscore
};

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
