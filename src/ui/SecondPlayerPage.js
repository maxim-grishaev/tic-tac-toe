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

  player = () => this.props.match.params.player;

  pong = (type, extras) => sendMessage(window.opener, createMessage(type, { player: this.player(), ...extras }));

  nextMove = index => this.pong(TYPES.NEXT_MOVE, { index });

  componentDidMount() {
    subscribe(({ type, payload }) => {
      if (type === TYPES.STATE) {
        this.setState(() => ({ ...payload, isReady: true }));
      }
    });
    this.pong(TYPES.PLAYER_READY);
  }

  render() {
    return (
      <Layout title={`Welcome to Tic-Tac-Toe, Player ${this.player()}!`}>
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
