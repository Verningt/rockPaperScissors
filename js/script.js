"use strict";

let computerScore = 0;
let playerScore = 0;
const computerScoreText = document.querySelector(".computer-score");
const playerScoreText = document.querySelector(".player-score");
const resultMessage = document.querySelector(".round-result");
const scoreVisibility = document.querySelectorAll(".score-container");
const itemsContainer = document.querySelectorAll(".items-container");
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");

updateScores();

document.querySelectorAll(".image-wrapper.player").forEach((element) => {
  element.addEventListener("click", function () {
    this.classList.add("scaleAnimate");
    this.addEventListener(
      "animationend",
      () => {
        this.classList.remove("scaleAnimate");
      },
      { once: true }
    );
  });
});

let areImagesClickable = true;

rockBtn.addEventListener("click", () => {
  if (areImagesClickable) {
    playRound("Rock");
  }
});

paperBtn.addEventListener("click", () => {
  if (areImagesClickable) {
    playRound("Paper");
  }
});

scissorsBtn.addEventListener("click", () => {
  if (areImagesClickable) {
    playRound("Scissors");
  }
});

function disableImageClicks() {
  areImagesClickable = false;
}

function enableImageClicks() {
  areImagesClickable = true;
}

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}

function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  animateComputerChoice(computerChoice);

  let roundResult = determineWinner(playerChoice, computerChoice);

  if (roundResult.includes("You")) {
    playerScore++;
  } else if (roundResult.includes("Bot")) {
    computerScore++;
  }
  scoreShow();
  updateResultMessage(roundResult);
  updateScores();

  if (playerScore === 5 || computerScore === 5) {
    declareWinner();
    endGame();
  }
}

function changeColor(color) {
  if (color === "red") {
    resultMessage.style.color = "red";
  } else if (color === "chartreuse") {
    resultMessage.style.color = "chartreuse";
  } else if (color === "gold") {
    resultMessage.style.color = "gold";
  } else resultMessage.style.color = "rgb(180, 180, 255)";
}

function animateComputerChoice(choice) {
  const computerChoiceElement = document.querySelector(
    `.items-container.computer .${choice.toLowerCase()}`
  );
  computerChoiceElement.classList.add("scaleAnimate");
  computerChoiceElement.addEventListener(
    "animationend",
    () => {
      computerChoiceElement.classList.remove("scaleAnimate");
    },
    { once: true }
  );
}

function determineWinner(playerChoice, computerChoice) {
  const choicesToEmoji = {
    Rock: "🪨",
    Paper: "📑",
    Scissors: "✂️",
  };

  const playerEmoji = choicesToEmoji[playerChoice];
  const computerEmoji = choicesToEmoji[computerChoice];

  if (playerChoice === computerChoice) {
    changeColor("gold");
    return `${playerEmoji} / ${computerEmoji}<br><br><br>It's a tie!`;
  } else if (
    (playerChoice === "Rock" && computerChoice === "Scissors") ||
    (playerChoice === "Paper" && computerChoice === "Rock") ||
    (playerChoice === "Scissors" && computerChoice === "Paper")
  ) {
    changeColor("chartreuse");
    return `${playerEmoji} > ${computerEmoji}<br><br>You win<br>the round!`;
  } else {
    changeColor("red");
    return `${playerEmoji} < ${computerEmoji}<br><br>Bot wins<br>the round!`;
  }
}

function updateResultMessage(message) {
  resultMessage.classList.remove("resultPop");
  void resultMessage.offsetWidth;
  resultMessage.innerHTML = message;
  resultMessage.classList.add("resultPop");
}

function scoreShow() {
  scoreVisibility.forEach((element) => {
    element.classList.remove("hide", "fade-out");
    element.classList.add("fade-in");
  });
}

function scoreHide() {
  scoreVisibility.forEach((element) => {
    element.classList.add("fade-out");
  });
}

function itemsShow() {
  itemsContainer.forEach((element) => {
    element.classList.remove("fade-out");
    element.classList.add("fade-in");
  });
}

function itemsHide() {
  itemsContainer.forEach((element) => {
    element.classList.add("fade-out");
  });
}

function updateScores() {
  playerScoreText.innerHTML = playerScore;
  computerScoreText.innerHTML = computerScore;
}

function declareWinner() {
  disableImageClicks();
  itemsHide();
  let winnerMessage;

  if (playerScore === 5) {
    confetti();
    winnerMessage = `🎉<br>You won<br>the game!`;
    updateResultMessage(winnerMessage);
  } else {
    winnerMessage = `💀<br />Better luck<br />next time...`;
    updateResultMessage(winnerMessage);
  }

  setTimeout(() => {
    const additionalMessage = `🏆<br />Score 5 points<br />to win!`;
    updateResultMessage(additionalMessage);
    enableImageClicks();
    itemsShow();
  }, 2000);

  scoreHide();
  changeColor("white");
}

function endGame() {
  disableButtons();
  playerScore = 0;
  computerScore = 0;
  updateScores();
}

function disableButtons() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
}

function enableButtons() {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}
