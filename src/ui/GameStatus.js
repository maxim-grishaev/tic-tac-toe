import React from 'react';
import PropTypes from 'prop-types';

import { GAME_STATE, getGameState, isWinner, isLooser } from '../lib/board';

GameStatus.propTypes = {
  board: PropTypes.array.isRequired,
  stepIndex: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  children: PropTypes.node
};
export default function GameStatus({ board, player, stepIndex, currentPlayer, onRestart, children }) {
  const gameState = getGameState(board);
  const isWaiting = player !== currentPlayer;

  let title = 'Choose your move...';
  if (isWaiting) {
    title = 'Wait for your opponent.';
  }
  if (gameState === GAME_STATE.DRAW) {
    title = 'Draw';
  }
  if (isLooser(player, board)) {
    title = 'You loose :(';
  }
  if (isWinner(player, board)) {
    title = 'You win!';
  }
  return (
    <div>
      <h1>{title}</h1>

      {children}

      <div
        style={{
          margin: '20px 0 0'
        }}
      >
        {gameState !== GAME_STATE.PLAYING && <button onClick={onRestart}>Start again!</button>}
        <div
          style={{
            color: 'gray',
            fontSize: 'x-small'
          }}
        >
          <p>Move #{stepIndex + 1}</p>
          <p>gameState: "{gameState}"</p>
        </div>
      </div>
    </div>
  );
}
