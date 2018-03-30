// @flow
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

export type TPlayers = $Values<typeof PLAYERS>;
export type TGameState = $Values<typeof GAME_STATE>;
export type TBoard = Array<TPlayers>;

export const createBoard = (): TBoard => [
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

const hasLineOf = (player: TPlayers, board: TBoard): boolean =>
  LINES.some(line => line.every(coord => board[coord] === player));
const hasAnyOfType = (player: TPlayers, board: TBoard): boolean => board.some(value => value === player);

export const getIndexesByPlayer = (player: TPlayers, board: TBoard): number[] =>
  board.map((val, i) => (val === player ? i : -1)).filter(val => val !== -1);

export const getGameState = (board: TBoard): TGameState => {
  if (hasLineOf(PLAYERS.PLAYER_X, board)) {
    return GAME_STATE.WIN_X;
  }
  if (hasLineOf(PLAYERS.PLAYER_0, board)) {
    return GAME_STATE.WIN_0;
  }
  return hasAnyOfType(PLAYERS.NOBODY, board) ? GAME_STATE.PLAYING : GAME_STATE.DRAW;
};

export const isWinner = (player: TPlayers, board: TBoard): boolean => hasLineOf(player, board);

export const opponent = (player: TPlayers): TPlayers =>
  player === PLAYERS.PLAYER_0 ? PLAYERS.PLAYER_X : PLAYERS.PLAYER_0;

export const isLooser = (player: TPlayers, board: TBoard): boolean => hasLineOf(opponent(player), board);

export const isDraw = (board: TBoard): boolean => {
  const gameState = getGameState(board);
  return gameState === GAME_STATE.DRAW;
};
