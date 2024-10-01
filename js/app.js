/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/
const init = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
};

const render = () => {
  updateBoard();
  updateMessage();
};

const updateBoard = () => {
  squareEls.forEach((squareEl, idx) => (squareEl.innerText = board[idx]));
};

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.innerText = `Now is ${turn} turn`;
  } else if (!winner && tie) {
    messageEl.innerText = "Nobody win. It is a tie";
  } else {
    messageEl.innerText = `Congratulations. ${turn} win the game`;
  }
};

const handleClick = (e) => {
  const squareIndex = e.target.id;
  if (board[squareIndex] === "X" || board[squareIndex] === "O") {
    return;
  } else if (winner) {
    return;
  } else {
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();
  }
};

const placePiece = (index) => {
  board[index] = turn;
};

const checkForWinner = () => {
  for (const combo of winningCombos) {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
    }
  }
};

const checkForTie = () => {
  if (winner) {
    return;
  } else if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
  }
};

const switchPlayerTurn = () => {
  if (winner) {
    return;
  } else if (!winner) {
    turn = turn === "X" ? "O" : "X";
  }
};

/*----------------------------- Event Listeners -----------------------------*/
init();
squareEls.forEach((squareEl) =>
  squareEl.addEventListener("click", handleClick)
);
resetBtnEl.addEventListener("click", init);
