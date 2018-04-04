import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameStatus from './GameStatus';
import Board from './Board';

class PlayerPage extends Component {
  static propTypes = {
    nextMove: PropTypes.func.isRequired,
    player: PropTypes.string.isRequired,
    currentPlayer: PropTypes.string.isRequired
  };

  render() {
    return (
      <GameStatus
        board={this.props.board}
        player={this.props.player}
        currentPlayer={this.props.currentPlayer}
        stepIndex={this.props.stepIndex}
      >
        <Board
          board={this.props.board}
          player={this.props.player}
          currentPlayer={this.props.currentPlayer}
          stepIndex={this.props.stepIndex}
          onClick={this.props.nextMove}
        />
      </GameStatus>
    );
  }
}

export default PlayerPage;
