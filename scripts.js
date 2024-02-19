const gameBoard = (() => {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let turn = 0;
  const takeTurn = () => turn++;
  const naught = (y, x) => markBoard(y, x, "o");
  const cross = (y, x) => markBoard(y, x, "x");
  const display = () => console.log(board);

  function markBoard(y, x, shape) {
    if (legalMove(y, x, board)) {
      board[y].splice(x, 1, shape);
      checkVictory(board);
      takeTurn();
      return "success";
    } else {
      console.log("invalid");
      return "invalid";
    }
  }

  function legalMove(y, x, board) {
    return board[y][x] !== "x" && board[y][x] !== "o";
  }

  function checkVictory() {
    let naught = 0;
    let cross = 0;
    // Horizontal
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (board[y][x] === "x") {
          cross++;
        } else if (board[y][x] === "o") {
          naught++;
        }
      }
      if (naught === 3) {
        console.log("Naughts win across!");
        return "Naughts Win";
      } else {
        naught = 0;
      }
      if (cross === 3) {
        console.log("Crosses win across!");
        return "Crosses Win";
      } else {
        cross = 0;
      }
    }
    // Vertical
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (board[y][x] === "x") {
          cross++;
        } else if (board[y][x] === "o") {
          naught++;
        }
      }
      if (naught === 3) {
        console.log("Naughts win up/down!");
        return "Naughts Win";
      } else {
        naught = 0;
      }
      if (cross === 3) {
        console.log("Crosses win up/down!");
        return "Crosses Win";
      } else {
        cross = 0;
      }
    }
    // Diagonal
    if (
      (board[0][0] === "x" && board[1][1] === "x" && board[2][2] === "x") ||
      (board[0][2] === "x" && board[1][1] === "x" && board[2][0] === "x")
    ) {
      console.log("Crosses win Diagonally!");
      return "Crosses Win";
    }
    if (
      (board[0][0] === "o" && board[1][1] === "o" && board[2][2] === "o") ||
      (board[0][2] === "o" && board[1][1] === "o" && board[2][0] === "o")
    ) {
      console.log("Naughts win Diagonally!");
      return "Naughts Win";
    }
    // Tie
    if (turn === 9) {
      console.log("TIE");
      return "TIE";
    }
  }

  return { naught, cross, display, checkVictory };
})();

const player = (() => {
  let currentTurn = "x";
  const getTurn = () => currentTurn;
  const swapTurn = () => (currentTurn = currentTurn === "x" ? "o" : "x");
  let winnerDeclared = false;
  const checkWinner = () => winnerDeclared;
  const setWinner = () => (winnerDeclared = true);

  return { getTurn, swapTurn, checkWinner, setWinner };
})();

function gameController(target) {
  let row;
  let column;
  if (target.classList.contains("1")) {
    row = 0;
    column = 0;
  }
  if (target.classList.contains("2")) {
    row = 0;
    column = 1;
  }
  if (target.classList.contains("3")) {
    row = 0;
    column = 2;
  }
  if (target.classList.contains("4")) {
    row = 1;
    column = 0;
  }
  if (target.classList.contains("5")) {
    row = 1;
    column = 1;
  }
  if (target.classList.contains("6")) {
    row = 1;
    column = 2;
  }
  if (target.classList.contains("7")) {
    row = 2;
    column = 0;
  }
  if (target.classList.contains("8")) {
    row = 2;
    column = 1;
  }
  if (target.classList.contains("9")) {
    row = 2;
    column = 2;
  }
  console.log(player.getTurn());
  if (player.getTurn() === "x") {
    if (gameBoard.cross(row, column, "x") === "success") {
      target.innerText = "X";
      player.swapTurn();
    }
  } else {
    if (gameBoard.naught(row, column, "o") === "success") {
      target.innerText = "O";
      player.swapTurn();
    }
  }
  let victorious = gameBoard.checkVictory();
  console.log(victorious);
  if (victorious && !player.checkWinner()) {
    document.querySelector("#winner").innerText = victorious;
    player.setWinner();
  }
}

function clickListener() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("square")) {
      gameController(target);
    }
  });
}

clickListener();
