var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.getElementById("dice-img").style.visibility = "hidden";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", function () {
  // Generate a random number.
  var dice = Math.floor(Math.random() * 6 + 1);

  // Display the result.
  var diceDOM = document.getElementById("dice-img");
  diceDOM.style.visibility = "visible";
  diceDOM.src = "./css/img/dice-" + dice + ".png";

  // Update the roundScore only IF the rolled number isn't 1.
  if (dice !== 1) {
    // Add score.
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
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
    diceDOM.style.visibility = "hidden";
  }
});
