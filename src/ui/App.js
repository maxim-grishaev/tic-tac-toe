import React, { Component } from 'react';

import { createBoard, CELL_STATE, GAME_STATE } from '../lib/board';
import { minimax, nextMove } from '../lib/player';

import GameStatus from './GameStatus';
import Layout from './Layout';
import Board from './Board';

import '../assets/reset.css';

class App extends Component {
  state = {
    stepIndex: 0
  };
  board = createBoard();

  // getCurrentPlayer = () => (this.state.moves % 2 === 0 ? CELL_STATE.PLAYER_X : CELL_STATE.PLAYER_0);

  move = index => {
    this.setState(state => {
      this.board[index] = CELL_STATE.PLAYER_X;

      const p0Index = nextMove(this.board);
      if (p0Index != null) {
        this.board[p0Index] = CELL_STATE.PLAYER_0;
      }

      // console.log('[19:06:33] App.js >>> move', minimax(this.board, CELL_STATE.PLAYER_0));
      return {
        stepIndex: state.stepIndex + 1
      };
    });
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
      <Layout title="Welcome to Tic-Tac-Toe">
        <GameStatus board={this.board} stepIndex={this.state.stepIndex} onRestart={this.startAgain}>
          <Board board={this.board} onClick={this.move} />
        </GameStatus>
      </Layout>
    );
  }
}

export default App;
