let playerScore = 0;
let computerScore = 0;
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const outcomeDiv = document.querySelector(".outcome");
const p = document.createElement("p");
p.textContent = "";
outcomeDiv.appendChild(p);
const score = document.querySelector(".score");

function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return "Rock";
    case 1:
      return "Paper";
    case 2:
      return "Scissors";
  }
}

function playGame(playerChoice, computerChoice) {
  let roundResult = "";

  if (playerChoice === computerChoice) {
    roundResult = "It's a tie!";
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    roundResult = "Player wins this round!";
    playerScore++;
  } else {
    roundResult = "Computer wins this round!";
    computerScore++;
  }

  p.textContent = roundResult;
  score.innerHTML = "";

  const playerChoiceLine = document.createElement("p");
  playerChoiceLine.textContent = `Player's choice: ${playerChoice}`;
  score.appendChild(playerChoiceLine);

  const computerChoiceLine = document.createElement("p");
  computerChoiceLine.textContent = `Computer's choice: ${computerChoice}`;
  score.appendChild(computerChoiceLine);

  const playerScoreLine = document.createElement("p");
  playerScoreLine.textContent = `Player's score: ${playerScore}`;
  score.appendChild(playerScoreLine);

  const computerScoreLine = document.createElement("p");
  computerScoreLine.textContent = `Computer's score: ${computerScore}`;
  score.appendChild(computerScoreLine);

  if (playerScore === 5) {
    p.textContent = "Congratulations! Player wins the game!";
    displayWinnerMessage(p.textContent);
    endGame();
  } else if (computerScore === 5) {
    p.textContent = "Computer wins the game. Better luck next time!";
    displayWinnerMessage(p.textContent);
    endGame();
  }
}

function disableButtons() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
}

function displayWinnerMessage(message) {
  p.textContent = message;
}

rockBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const playerChoice = "Rock";
  playGame(playerChoice, computerChoice);
});

paperBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const playerChoice = "Paper";
  playGame(playerChoice, computerChoice);
});

scissorsBtn.addEventListener("click", () => {
  const computerChoice = getComputerChoice();
  const playerChoice = "Scissors";
  playGame(playerChoice, computerChoice);
});

function endGame() {
  disableButtons();
  score.innerHTML = "";
}
