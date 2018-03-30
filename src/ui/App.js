import React, { Component } from 'react';

import { createBoard, PLAYERS, getGameState, GAME_STATE } from '../lib/board';
import { nextMove } from '../lib/player';

import PlayerPage from './PlayerPage';

import '../assets/reset.css';

class App extends Component {
  state = {
    stepIndex: 0
  };
  board = createBoard();

  getCurrentPlayer = () => (this.state.stepIndex % 2 === 0 ? PLAYERS.PLAYER_X : PLAYERS.PLAYER_0);

  makeMove = index => {
    this.setState(state => {
      this.board[index] = this.getCurrentPlayer();
      return {
        stepIndex: state.stepIndex + 1
      };
    });
  };

  move = index => {
    const gameState = getGameState(this.board);
    if (gameState !== GAME_STATE.PLAYING) {
      return;
    }
    this.makeMove(index);
    setTimeout(() => {
      const aiIndex = nextMove(this.board);
      this.makeMove(aiIndex);
    }, Math.random() * 500);
  };

  startAgain = () => {
    this.setState(() => {
      this.board = createBoard();
      return {
        stepIndex: 0
      };
    });
  };

  render() {
    return (
      <PlayerPage
        player={PLAYERS.PLAYER_X}
        currentPlayer={this.getCurrentPlayer()}
        board={this.board}
        stepIndex={this.state.stepIndex}
        startAgain={this.startAgain}
        nextMove={this.move}
      />
    );
  }
}

export default App;
