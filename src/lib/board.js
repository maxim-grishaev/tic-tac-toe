export const BOARD_SIZE = 3;

export const CELL_STATE = {
  NONE: '_',
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
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE,
  CELL_STATE.NONE
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

export const getIndexesOfCellState = (cellState, board) =>
  board.map((val, i) => (val === cellState ? i : null)).filter(val => val != null);

export const getGameState = board => {
  if (hasLineOf(CELL_STATE.PLAYER_X, board)) {
    return GAME_STATE.WIN_X;
  }
  if (hasLineOf(CELL_STATE.PLAYER_0, board)) {
    return GAME_STATE.WIN_0;
  }
  return hasAnyOfType(CELL_STATE.NONE, board) ? GAME_STATE.PLAYING : GAME_STATE.DRAW;
};

export const chopBoard = (board, sliceSize = BOARD_SIZE) =>
  board.reduce((memo, value, i) => {
    const rowIndex = Math.floor(i / sliceSize);
    const colIndex = i % sliceSize;
    if (colIndex === 0) {
      memo[rowIndex] = [];
    }
    memo[rowIndex][colIndex] = value;
    return memo;
  }, []);
