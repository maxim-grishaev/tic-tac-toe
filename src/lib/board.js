export const PLAYERS = {
  NOBODY: '_',
  PLAYER_X: 'X',
  PLAYER_0: '0'
};

export const GAME_STATE = {
  PLAYING: 'playing',
  WIN_X: 'X wins',
  WIN_0: '0 wins',
  DRAW: 'draw'
};

export const createBoard = () => [
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY,
  PLAYERS.NOBODY
];

/*
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
const LINES = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6]
];

const hasLineOf = (cellState, board) => LINES.some(line => line.every(coord => board[coord] === cellState));
const hasAnyOfType = (cellState, board) => board.some(value => value === cellState);

export const getIndexesByPlayer = (cellState, board) =>
  board.map((val, i) => (val === cellState ? i : null)).filter(val => val != null);

export const getGameState = board => {
  if (hasLineOf(PLAYERS.PLAYER_X, board)) {
    return GAME_STATE.WIN_X;
  }
  if (hasLineOf(PLAYERS.PLAYER_0, board)) {
    return GAME_STATE.WIN_0;
  }
  return hasAnyOfType(PLAYERS.NOBODY, board) ? GAME_STATE.PLAYING : GAME_STATE.DRAW;
};

export const isWinner = (player, board) => hasLineOf(player, board);

export const opponent = player => (player === PLAYERS.PLAYER_0 ? PLAYERS.PLAYER_X : PLAYERS.PLAYER_0);

export const isLooser = (player, board) => hasLineOf(opponent(player), board);

export const isDraw = board => {
  const gameState = getGameState(board);
  return gameState === GAME_STATE.DRAW;
};
