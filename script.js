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

function playerSelection() {
  let choice = prompt(
    "Please choose either 'Rock', 'Paper', or 'Scissors':"
  ).toLowerCase();
  while (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    choice = prompt(
      "Invalid choice! Please choose either 'Rock', 'Paper', or 'Scissors':"
    ).toLowerCase();
  }
  return choice;
}

function playGame() {
  let playerScore = 0;
  let computerScore = 0;

  for (let round = 1; round <= 5; round++) {
    const computerChoice = getComputerChoice();
    const playerChoice = playerSelection();

    console.log(`Round ${round}:`);
    console.log(`Player's choice: ${playerChoice}`);
    console.log(`Computer's choice: ${computerChoice}`);

    if (playerChoice === computerChoice) {
      console.log("It's a tie!");
    } else if (
      (playerChoice === "rock" && computerChoice === "Scissors") ||
      (playerChoice === "paper" && computerChoice === "Rock") ||
      (playerChoice === "scissors" && computerChoice === "Paper")
    ) {
      console.log("Player wins this round!");
      playerScore++;
    } else {
      console.log("Computer wins this round!");
      computerScore++;
    }
  }

  console.log("\nGame Over!");
  console.log(`Player's score: ${playerScore}`);
  console.log(`Computer's score: ${computerScore}`);

  if (playerScore > computerScore) {
    console.log("Congratulations! Player wins the game!");
  } else if (playerScore < computerScore) {
    console.log("Computer wins the game. Better luck next time!");
  } else {
    console.log("It's a tie game!");
  }
}

// Start the game
playGame();
