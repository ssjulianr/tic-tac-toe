// Importing the 'useState' hook from the 'react' library
import { useState } from 'react';

// Square component represents a single square in the tic-tac-toe grid
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component represents the tic-tac-toe game board
function Board({ xIsNext, squares, onPlay }) {
  // Function to handle click on a square
  function handleClick(i) {
    // Check if there is already a winner or the square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a new copy of squares array
    const nextSquares = squares.slice();
    // Update the square with X or O based on the current player
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Call the onPlay function with the updated squares
    onPlay(nextSquares);
  }

  // Determine the winner based on the current squares
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component represents the tic-tac-toe game
export default function Game() {
  // Initialize the game state using the useState hook
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Function to handle a play in the game
  function handlePlay(nextSquares) {
    // Create a new history array by appending the new squares to the existing history
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update the history state with the new history array
    setHistory(nextHistory);
    // Update the current move to the last move in the history
    setCurrentMove(nextHistory.length - 1);
  }

  // Function to jump to a specific move in the game
  function jumpTo(nextMove) {
    // Update the current move to the selected move index
    setCurrentMove(nextMove);
  }

  // Create a list of buttons representing the moves in the game
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner based on the current squares
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check if any of the winning lines have the same symbol (X or O)
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Return null if there is no winner
  return null;
}
