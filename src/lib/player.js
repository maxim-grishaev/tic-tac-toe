import { PLAYERS, getIndexesByPlayer, isWinner, isLooser, isDraw, opponent } from './board';

/*
 * https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13];
 */
export const nextMove = board => {
  const move = minimax(board, PLAYERS.PLAYER_0);
  return move.index;
};

const createMove = (score = -Infinity, index = null) => ({ index, score });

function minimax(board, player) {
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
  const bestMove = freeCells.reduce((prevMove, cellIndex) => {
    const secondPlayer = opponent(player);
    const newBoard = [...board];
    newBoard[cellIndex] = player;

    const g = minimax(newBoard, secondPlayer);
    const move = createMove(-g.score, cellIndex);

    if (move.score === prevMove.score) {
      return Math.random() > 0.5 ? move : prevMove;
    }

    if (move.score > prevMove.score) {
      return move;
    }

    return prevMove;
  }, createMove());

  return bestMove;
}
