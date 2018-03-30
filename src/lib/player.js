// @flow
import { PLAYERS, getIndexesByPlayer, isWinner, isLooser, isDraw, opponent } from './board';
import type { TBoard, TPlayers } from './board';

/*
 * https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13];
 */
export const nextMove = (board: TBoard, player: TPlayers = PLAYERS.PLAYER_0) => {
  const move = minimax(board, player);
  return move.index;
};

type TMove = {
  index: ?number,
  score: number
};
const createMove = (score = -Infinity, index = null) => ({ index, score });

function minimax(board: TBoard, player: TPlayers): TMove {
  if (isWinner(player, board)) {
    return createMove(10);
  }

  if (isLooser(player, board)) {
    return createMove(-10);
  }

  if (isDraw(board)) {
    return createMove(0);
  }

  let freeCells = getIndexesByPlayer(PLAYERS.NOBODY, board);
  if (freeCells.length === 0) {
    throw new Error(`Invalid board: ${JSON.stringify(board)}`);
  }
  const bestMove = freeCells.reduce((bestMoveSoFar, cellIndex) => {
    const secondPlayer = opponent(player);
    const newBoard = [...board];
    newBoard[cellIndex] = player;

    const g = minimax(newBoard, secondPlayer);
    const move = createMove(-g.score, cellIndex);

    // A bit of random for little more interest
    if (move.score === bestMoveSoFar.score) {
      return Math.random() * 2 > 1 ? move : bestMoveSoFar;
    }

    if (move.score > bestMoveSoFar.score) {
      return move;
    }

    return bestMoveSoFar;
  }, createMove());

  return bestMove;
}
