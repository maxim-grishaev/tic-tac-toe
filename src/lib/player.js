import { CELL_STATE, GAME_STATE, getGameState, getIndexesOfCellState } from './board';

/*
 * https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13];
 */
export const nextMove = board => getIndexesOfCellState(CELL_STATE.NONE, board)[0];

export function minimax(board, player) {
  let freeCells = getIndexesOfCellState(CELL_STATE.NONE, board);
  const gameState = getGameState(board);
  switch (gameState) {
    case GAME_STATE.PLAYER_X:
      return {
        score: -10
      };
    case GAME_STATE.PLAYER_0:
      return {
        score: 10
      };
    case GAME_STATE.DRAW:
      return {
        score: 0
      };
  }

  const moves = [];
  for (let i = 0; i < freeCells.length; i++) {
    const move = {};
    move.index = board[freeCells[i]];
    board[freeCells[i]] = player;

    if (player === CELL_STATE.PLAYER_0) {
      const g = minimax(board, CELL_STATE.PLAYER_X);
      move.score = g.score;
    } else {
      const g = minimax(board, CELL_STATE.PLAYER_0);
      move.score = g.score;
    }
    board[freeCells[i]] = move.index;
    moves.push(move);
  }

  let bestMove;
  if (player === CELL_STATE.PLAYER_0) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
