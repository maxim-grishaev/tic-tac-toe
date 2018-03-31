import React, { Component } from 'react';

import { sendMessage, subscribe, createMessage, TYPES } from '../lib/messages';

import PlayerPage from './PlayerPage';
import Layout from './Layout';

import '../assets/reset.css';

class SecondPlayerPage extends Component {
  state = {
    isReady: false,
    error: null
  };

  nextMove = index => sendMessage(window.opener, createMessage(TYPES.NEXT_MOVE, index));

  componentDidMount() {
    subscribe(({ type, payload }) => {
      if (type === TYPES.STATE) {
        this.setState(() => ({ ...payload, isReady: true }));
      }
    });
  }

  render() {
    const title = this.state.player ? `Welcome to Tic-Tac-Toe, ${this.state.player}` : 'Welcome to Tic-Tac-Toe';
    return (
      <Layout title={title}>
        {this.state.isReady ? (
          <PlayerPage
            player={this.state.player}
            currentPlayer={this.state.currentPlayer}
            board={this.state.board}
            stepIndex={this.state.stepIndex}
            nextMove={this.nextMove}
          />
        ) : (
          <h1>Loading...</h1>
        )}
      </Layout>
    );
  }
}

export default SecondPlayerPage;
