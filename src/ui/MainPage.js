import React, { Component } from 'react';

import { createBoard, PLAYERS, getGameState, GAME_STATE } from '../lib/board';
import { subscribe, sendMessage, createMessage, TYPES } from '../lib/messages';
import { nextMove } from '../lib/player';
import { urls } from '../lib/urls';

import Layout from './Layout';
import PlayerPage from './PlayerPage';

import '../assets/reset.css';

class MainPage extends Component {
  state = {
    stepIndex: 0
  };
  board = createBoard();
  playerWindows = {};

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

  collectState = player => ({
    stepIndex: this.state.stepIndex,
    board: this.board,
    player: player,
    currentPlayer: this.getCurrentPlayer()
  });

  tryPingPlayer = (player = PLAYERS.PLAYER_0) => {
    const hasWindow = this.hasOpenedWindow(player);
    if (hasWindow) {
      this.pingPlayer(player);
    }
    return hasWindow;
  };

  hasOpenedWindow = player => this.playerWindows[player] && !this.playerWindows[player].closed;

  pingPlayer = player => sendMessage(this.playerWindows[player], createMessage(TYPES.STATE, this.collectState(player)));

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

    if (!this.tryPingPlayer()) {
      this.pingAi();
    }
  };

  startAgain = () => {
    this.setState(() => {
      this.board = createBoard();
      return {
        stepIndex: 0
      };
    }, this.tryPingPlayer);
  };

  openWindow = player => {
    const url = urls.opponent({ player });
    const playerWindow = window.open(url, player);

    const subscribeWindow = () => {
      this.tryPingPlayer(player);
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
      switch (type) {
        case TYPES.NEXT_MOVE:
          this.nextMove(payload.index, payload.player);
          break;
        case TYPES.PLAYER_READY:
          this.tryPingPlayer(payload.player);
          break;
        default:
          break;
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
          nextMove={this.nextMove}
        />

        <p>
          <button onClick={this.startAgain}>Restart</button>
        </p>
        {!this.hasOpenedWindow(PLAYERS.PLAYER_0) && (
          <p>
            <button onClick={this.openWindow0}>Open window for Player 0</button>
          </p>
        )}
      </Layout>
    );
  }
}

export default MainPage;
