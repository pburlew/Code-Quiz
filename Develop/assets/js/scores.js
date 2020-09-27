var clearBtnEl = document.querySelector("#clear");
var highScoresEl = document.querySelector("#highscores");

function printHighscores() {
  highScoresEl.innerHTML = "";
  // get from localstorage
  showHighScores = JSON.parse(localStorage.getItem("High Scores"));
  
  //check to see it works! 
  console.log(showHighScores + "high scores are working");
  


  // (optional) sort highscores by score property in descending order

  // for each score
  for (var i =0; i < showHighScores.length; i++){
    // create li tag for each high score
    var li = document.createElement("li");
    li.textContent = (showHighScores[i].Initials + ": " + showHighScores[i].Score);

     // display on page
    highScoresEl.appendChild(li);
  };
  

   
};

//use local storage to clear the saved high scores
function clearHighscores() {
  highScoresEl.innerHTML = "";
  localStorage.removeItem("High Scores")
}

// run printhighscore when page loads
window.onload = printHighscores;

// attach clear event to clear score button
clearBtnEl.onclick = (clearHighscores);

