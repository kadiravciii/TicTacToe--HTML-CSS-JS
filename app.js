const cells = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const restartButton = document.querySelector("#restart");
let currentPlayer = "X";
let gameStatus = "inProgress";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);

function handleCellClick() {
  const cellIndex = Array.from(cells).indexOf(this);

  if (gameStatus === "inProgress" && this.textContent === "") {
    this.textContent = currentPlayer;

    if (checkForWin(currentPlayer)) {
      gameStatus = "ended";
      highlightWinningCells();
      alert(currentPlayer + " wins!");
    } else if (checkForDraw()) {
      gameStatus = "ended";
      alert("It's a draw!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      board.classList.toggle("o-turn");
    }
  }
}

function checkForWin(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].textContent === player;
    });
  });
}

function checkForDraw() {
  return Array.from(cells).every((cell) => {
    return cell.textContent !== "";
  });
}

function highlightWinningCells() {
  winningCombinations.forEach((combination) => {
    const cellsInCombination = combination.map((index) => cells[index]);
    const isWinningCombination = cellsInCombination.every(
      (cell) => cell.textContent === currentPlayer
    );

    if (isWinningCombination) {
      cellsInCombination.forEach((cell) => {
        cell.classList.add("winner");
      });
    }
  });
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });

  currentPlayer = "X";
  gameStatus = "inProgress";
  board.classList.remove("o-turn");
}
restartButton.addEventListener("click", restartGame);

