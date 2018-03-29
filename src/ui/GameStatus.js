import React from 'react';
import PropTypes from 'prop-types';

import { GAME_STATE, getGameState } from '../lib/board';

GameStatus.propTypes = {
  board: PropTypes.array.isRequired,
  stepIndex: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
  children: PropTypes.node
};
export default function GameStatus({ board, stepIndex, onRestart, children }) {
  const gameState = getGameState(board);
  return (
    <div>
      {gameState === GAME_STATE.DRAW && <h1>Draw!</h1>}
      {gameState === GAME_STATE.WIN_X && <h1>X Wins!</h1>}
      {gameState === GAME_STATE.WIN_0 && <h1>0 Wins!</h1>}
      {gameState === GAME_STATE.PLAYING && <h1>Choose your move...</h1>}

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
