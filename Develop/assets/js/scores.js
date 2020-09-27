var clearBtnEl = document.querySelector("#clear");
var highScoresEl = document.querySelector("#highscores");

function printHighscores() {
  // either get scores from localstorage or set to empty array

  // (optional) sort highscores by score property in descending order

  // for each score
    // create li tag for each high score

    // display on page
}

//use local storage to clear the saved high scores
function clearHighscores() {
  highScoresEl.innerHTML = "";
  localStorage.removeItem("High Scores")
}

// run printhighscore when page loads
window.onload = printHighscores;

// attach clear event to clear score button
clearBtnEl.onclick = (clearHighscores);

