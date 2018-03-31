import React, { Component } from 'react';

import { createBoard, PLAYERS, getGameState, GAME_STATE } from '../lib/board';
import { subscribe, sendMessage, createMessage, TYPES } from '../lib/messages';
import { nextMove } from '../lib/player';

import Layout from './Layout';
import PlayerPage from './PlayerPage';

import '../assets/reset.css';

class MainPage extends Component {
  state = {
    stepIndex: 0
  };
  board = createBoard();
  playerWindows = {};

  hasWindow = player => this.playerWindows[player] && !this.playerWindows[player].closed;

  getCurrentPlayer = () => (this.state.stepIndex % 2 === 0 ? PLAYERS.PLAYER_X : PLAYERS.PLAYER_0);

  updateBoard = index => {
    return new Promise(resolve => {
      this.setState(state => {
        this.board[index] = this.getCurrentPlayer();
        return {
          stepIndex: state.stepIndex + 1
        };
      }, resolve);
    });
  };

  collectState = () => ({
    stepIndex: this.state.stepIndex,
    board: this.board,
    player: PLAYERS.PLAYER_0,
    currentPlayer: this.getCurrentPlayer()
  });

  pingPlayer = (player = PLAYERS.PLAYER_0) =>
    sendMessage(this.playerWindows[player], createMessage(TYPES.STATE, this.collectState()));

  pingAi = () =>
    setTimeout(() => {
      const aiIndex = nextMove(this.board);
      this.updateBoard(aiIndex);
    }, Math.random() * 500);

  nextMove = async index => {
    const gameState = getGameState(this.board);
    if (gameState !== GAME_STATE.PLAYING) {
      return;
    }

    await this.updateBoard(index);

    if (this.hasWindow(PLAYERS.PLAYER_0)) {
      this.pingPlayer();
    } else {
      this.pingAi();
    }
  };

  startAgain = () => {
    this.setState(() => {
      this.board = createBoard();
      return {
        stepIndex: 0
      };
    }, this.pingPlayer);
  };

  openWindow = player => {
    const playerWindow = window.open(`/player_${player}`, player);

    const subscribeWindow = () => {
      this.pingPlayer(player);
      playerWindow.addEventListener('unload', () => {
        this.playerWindows[player] = null;
        this.forceUpdate();
      });
      playerWindow.removeEventListener('load', subscribeWindow);
    };
    playerWindow.addEventListener('load', subscribeWindow);

    this.playerWindows[player] = playerWindow;
    this.forceUpdate();
  };

  openWindow0 = () => this.openWindow(PLAYERS.PLAYER_0);

  componentDidMount() {
    subscribe(({ type, payload }) => {
      if (type === TYPES.NEXT_MOVE) {
        this.nextMove(payload);
      }
    });
  }

  render() {
    return (
      <Layout title="Welcome to Tic-Tac-Toe!">
        <PlayerPage
          player={PLAYERS.PLAYER_X}
          currentPlayer={this.getCurrentPlayer()}
          board={this.board}
          stepIndex={this.state.stepIndex}
          startAgain={this.startAgain}
          nextMove={this.nextMove}
        />

        {!this.playerWindows[PLAYERS.PLAYER_0] && <button onClick={this.openWindow0}>Open window for Player 0</button>}
      </Layout>
    );
  }
}

export default MainPage;
