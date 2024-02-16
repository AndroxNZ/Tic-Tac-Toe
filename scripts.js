function createGame() {
  const board = [
    [1, 0, "x"],
    [0, 2, 0],
    [0, 0, 3],
  ];

  const naught = (x, y) => markBoard(x, y, "o");
  const cross = (x, y) => markBoard(x, y, "x");

  function markBoard(x, y, shape) {
    if (legalMove(x, y, board)) {
      board[x].splice(y, 1, shape);
      checkVictory(board);
    } else {
      console.log("invalid");
    }
  }

  const display = () => console.log(board);

  return { naught, cross, display };
}

const gameBoard = createGame();
gameBoard.display();
function legalMove(x, y, board) {
  return board[x][y] !== "x" && board[x][y] !== "o";
}

function checkVictory(board) {
  let cross = 0;
  let naught = 0;
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (board[x][y] === "x") {
        cross++;
      } else if (board[x][y] === "o") {
        naught++;
      }
    }
    if (naught === 3) {
      console.log("Naughts win!");
    } else naught = 0;
    if (cross === 3) {
      console.log("Crosses win!");
    } else cross = 0;
  }
}
