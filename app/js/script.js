// Global variables.
var scores, roundScore, activePlayer, gamePlaying, lastRoll;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // Generate a random number.
    var dice = Math.floor(Math.random() * 6 + 1);

    // Display the result.
    var diceDOM = document.getElementById("dice-img");
    diceDOM.style.visibility = "visible";
    diceDOM.src = "./css/img/dice-" + dice + ".png";

    // Update the roundScore only IF the rolled number isn't 1.

    if (lastRoll + dice === 12) {
      // Make the global score 0.
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = 0;

      // Next player
      nextPlayer();
    } else if (dice !== 1) {
      // Add score.
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // Next player.
      nextPlayer();
    }
  }
  lastRoll = dice;
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Send the score to the global score.
    scores[activePlayer] += roundScore;

    // Update the UI.
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.querySelector(".score-input").value;
    var winningScore;

    // Undefined, 0, null or "" are coerced to false
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    // Check if the player has own the game.
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";

      // Hide the dice again.
      document.getElementById("dice-img").style.visibility = "hidden";

      // Add winner class to the corresponding player.
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      // Remove active class from the corresponding player.
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      // Move to nextPlayer.
      nextPlayer();
    }
  }
});

document.querySelector("#btn-new").addEventListener("click", init);

function nextPlayer() {
  // Setting the roundScore to 0 in the UI.
  document.querySelector("#current-" + activePlayer).textContent = "0";

  // Move to next player.
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Robbing the score of the unfortunate!
  roundScore = 0;

  // Toggling the active class to visually indicate the activePlayer.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // Hide the dice again.
  document.getElementById("dice-img").style.visibility = "hidden";
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById("dice-img").style.visibility = "hidden";

  // Setting every value to 0.
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}
