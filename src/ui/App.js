import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { createBoard, PLAYERS, getGameState, GAME_STATE } from '../lib/board';
import { nextMove } from '../lib/player';

import PlayerPage from './PlayerPage';
import Layout from './Layout';

import '../assets/reset.css';

class App extends Component {
  state = {
    stepIndex: 0
  };
  board = createBoard();
  playerWindows = {};

  hasWindow = player => this.playerWindows[player] && !this.playerWindows[player].closed;

  getCurrentPlayer = () => (this.state.stepIndex % 2 === 0 ? PLAYERS.PLAYER_X : PLAYERS.PLAYER_0);

  updateBoard = index => {
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
    this.updateBoard(index);
    if (!this.hasWindow(PLAYERS.PLAYER_0)) {
      setTimeout(() => {
        const aiIndex = nextMove(this.board);
        this.updateBoard(aiIndex);
      }, Math.random() * 500);
    }
  };

  startAgain = () => {
    this.setState(() => {
      this.board = createBoard();
      return {
        stepIndex: 0
      };
    });
  };

  renderPlayerPage = player => {
    return (
      <Layout title={`Welcome to Tic-Tac-Toe, ${player}`}>
        <PlayerPage
          player={player}
          currentPlayer={this.getCurrentPlayer()}
          board={this.board}
          stepIndex={this.state.stepIndex}
          startAgain={this.startAgain}
          nextMove={this.move}
        />
      </Layout>
    );
  };

  getStyles = () => {
    // grab stylesheets from the window
    const parentStyleSheets = window.document.styleSheets;
    let cssString = '';
    for (let i = 0, count = parentStyleSheets.length; i < count; ++i) {
      const currentStyleSheet = parentStyleSheets[i];
      let cssRules;
      try {
        cssRules = currentStyleSheet.cssRules;
        for (let j = 0, countJ = cssRules.length; j < countJ; ++j) {
          cssString += cssRules[j].cssText;
        }
      } catch (e) {
        cssString += currentStyleSheet.cssText; // IE8 and earlier
      }
    }
    return cssString;
  };

  renderToWindow = player => {
    const playerWindow = this.playerWindows[player];

    const root = playerWindow.document.getElementById('root');
    const reactNode = this.renderPlayerPage(player);
    ReactDOM.render(reactNode, root);

    const style = playerWindow.document.getElementById('style');
    style.innerHTML = this.getStyles();
  };

  getHtml = title => `
    <html>
      <head>
        <base href="${window.location}" />
        <title>${title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <style id="style"></style>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `;

  openWindow = (player, title) => {
    let html = this.getHtml(title || player);
    const playerWindow = window.open(`javascript:${JSON.stringify(html)}`, player);

    playerWindow.addEventListener('unload', () => {
      this.playerWindows[player] = null;
      this.forceUpdate();
    });

    this.playerWindows[player] = playerWindow;
    this.forceUpdate();
  };

  openWindow0 = () => this.openWindow(PLAYERS.PLAYER_0, 'Player 0 << Tic-Tac-Toe');

  componentDidUpdate() {
    if (this.hasWindow(PLAYERS.PLAYER_0)) {
      this.renderToWindow(PLAYERS.PLAYER_0);
    }
  }

  render() {
    if (window.search) {
      return null;
    }
    const currentPlayer = this.getCurrentPlayer();
    return (
      <Layout title="Welcome to Tic-Tac-Toe!">
        <PlayerPage
          player={PLAYERS.PLAYER_X}
          currentPlayer={currentPlayer}
          board={this.board}
          stepIndex={this.state.stepIndex}
          startAgain={this.startAgain}
          nextMove={this.move}
        />

        {!this.playerWindows[PLAYERS.PLAYER_0] && <button onClick={this.openWindow0}>Open window for Player 0</button>}
      </Layout>
    );
  }
}

export default App;
