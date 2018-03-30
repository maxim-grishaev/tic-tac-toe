import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import Layout from './Layout';
import Board from './Board';

import '../assets/reset.css';

class PlayerPage extends Component {
  static propTypes = {
    nextMove: PropTypes.func.isRequired,
    startAgain: PropTypes.func.isRequired,
    player: PropTypes.string.isRequired,
    currentPlayer: PropTypes.string.isRequired
  };

  move = index => this.props.nextMove(index);
  startAgain = () => this.props.startAgain();

  render() {
    return (
      <Layout title="Welcome to Tic-Tac-Toe">
        <GameStatus
          board={this.props.board}
          player={this.props.player}
          currentPlayer={this.props.currentPlayer}
          stepIndex={this.props.stepIndex}
          onRestart={this.startAgain}
        >
          <Board
            board={this.props.board}
            player={this.props.player}
            currentPlayer={this.props.currentPlayer}
            stepIndex={this.props.stepIndex}
            onClick={this.move}
          />
        </GameStatus>
      </Layout>
    );
  }
}

export default PlayerPage;
