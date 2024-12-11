const dice = document.querySelector(".pigGame-dice");

const playersScore = {
  'player-1': 0,
  'player-2': 0
};
let currentScore = 0, currentPlayer = 1, gameActive = true;

function rollDice() {
  if (gameActive) {
    // random number between 1-6
    let diceNumber = Math.floor(Math.random() * 6) + 1;

    // display the correct dice
    dice.style.display = 'block';
    dice.src = `./images/dice-${diceNumber}.png`;

    // update the round score IF the rolled number was NOT a 1
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-score-${currentPlayer}`).textContent = currentScore;
    } else {
      nextPlayer();
    }
  }
}

function hold() {
  if (gameActive) {
    // add current score to total player score
    playersScore[`player-${currentPlayer}`] += currentScore;

    document.getElementById(`score-${currentPlayer}`).textContent =   playersScore[`player-${currentPlayer}`];

    if(!isWinner())
      nextPlayer();
  }
}

function isWinner() {
  if (playersScore[`player-${currentPlayer}`] >= 100) {
    document.getElementById(`player-${currentPlayer}`).textContent = 'Winner';

    dice.style.display = 'none';
    document.getElementById("current-score-1").textContent = 0;
    document.getElementById("current-score-2").textContent = 0;
    gameActive = false;
    return true;
  } 
  return false;
}

function nextPlayer() {
  currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
  currentScore = 0;

  document.getElementById("current-score-1").textContent = 0;
  document.getElementById("current-score-2").textContent = 0;

  document.querySelector('.player-1-container').classList.toggle('active');
  document.querySelector('.player-2-container').classList.toggle('active');

  dice.style.display = 'none';
}

function newGame() {
  location.reload();
}

function openGameRules() {
  document.querySelector(".backdrop").style.display = 'flex';
}

function closeGameRules() {
  document.querySelector(".backdrop").style.display = 'none';
}

