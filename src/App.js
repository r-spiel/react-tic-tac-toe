import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {

  // State starts off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState('');

  function swapPlayer() {
    setPlayer(!player);
    return player;
  };

  const onClickCallback = (updatedSquare) => {
    let updatedBoard = [];
    for (let row = 0; row < squares.length; row++) {
      for (let col = 0; col < squares.length; col++) {
        if (updatedSquare === squares[row][col].id && squares[row][col].value === '') {
          squares[row][col]['value'] = (swapPlayer() ? PLAYER_1 : PLAYER_2);
        }
      }
      updatedBoard.push(squares[row]);
    }
    setSquares(updatedBoard);
    checkForWinner();
  };


  const checkForWinner = () => {
    // if the winner is already delcared, return (don't assign new winner)
    if (winner !== '') return;
    
    // flatten the array of squares
    const flatArray = [].concat(...squares);
    // have a 2d array of combos to check
    const winnerCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

    // if any produce winner, set winner
    winnerCombos.forEach((combo) => {
      if (flatArray[combo[0]].value !== '' && flatArray[combo[0]].value === flatArray[combo[1]].value && flatArray[combo[1]].value === flatArray[combo[2]].value) {
        setWinner(flatArray[combo[0]].value);
        return;
      };
    })

    // if there are no empty sqaures, then it's a tie, game is over
    let sqauresToPlay = 0;
    flatArray.forEach((square) => {
      if (square.value === '') {
        sqauresToPlay += 1
      };
    });

    if (sqauresToPlay === 0) {
      setWinner('TIED! GAME OVER');
    };
  }

  const resetGame = () => {
    setSquares(generateSquares);
    setPlayer(true);
    setWinner('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button onClick={resetGame}> Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} winner={winner} />
      </main>
    </div>
  );
}

export default App;
