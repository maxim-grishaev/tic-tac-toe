import {
  PLAYERS,
  GAME_STATE,
  isDraw,
  isLooser,
  isWinner,
  getGameState,
  getIndexesByPlayer,
  opponent,
  createBoard
} from './board';

const convertToBoard = text =>
  text
    .replace(/\s/g, '')
    .split('X')
    .join(PLAYERS.PLAYER_X)
    .split('0')
    .join(PLAYERS.PLAYER_0)
    .split('.')
    .join(PLAYERS.NOBODY)
    .split('');

const BOARDS = {
  newOne: convertToBoard(`
    . . .
    . . .
    . . .
  `),
  winX: convertToBoard(`
    X X X
    0 . .
    0 0 .
  `),
  win0: convertToBoard(`
    X X 0
    0 0 X
    0 X .
  `),
  draw: convertToBoard(`
    X 0 X
    X 0 X
    0 X 0
  `)
};

describe('Board', () => {
  it('opponent', () => {
    expect(opponent(PLAYERS.PLAYER_0)).toBe(PLAYERS.PLAYER_X);
    expect(opponent(PLAYERS.PLAYER_X)).toBe(PLAYERS.PLAYER_0);
  });

  it('createBoard', () => {
    const newBoard = createBoard();
    expect(newBoard).toHaveLength(9);
    expect(newBoard).toEqual(BOARDS.newOne);
  });

  it('getGameState', () => {
    expect(getGameState(BOARDS.newOne)).toBe(GAME_STATE.PLAYING);
    expect(getGameState(BOARDS.winX)).toBe(GAME_STATE.WIN_X);
    expect(getGameState(BOARDS.win0)).toBe(GAME_STATE.WIN_0);
    expect(getGameState(BOARDS.draw)).toBe(GAME_STATE.DRAW);
  });

  it('isDraw', () => {
    expect(isDraw(BOARDS.newOne)).toBe(false);
    expect(isDraw(BOARDS.winX)).toBe(false);
    expect(isDraw(BOARDS.win0)).toBe(false);
    expect(isDraw(BOARDS.draw)).toBe(true);
  });

  it('isWinner', () => {
    expect(isWinner(PLAYERS.PLAYER_X, BOARDS.newOne)).toBe(false);
    expect(isWinner(PLAYERS.PLAYER_X, BOARDS.winX)).toBe(true);
    expect(isWinner(PLAYERS.PLAYER_X, BOARDS.win0)).toBe(false);
    expect(isWinner(PLAYERS.PLAYER_X, BOARDS.draw)).toBe(false);

    expect(isWinner(PLAYERS.PLAYER_0, BOARDS.newOne)).toBe(false);
    expect(isWinner(PLAYERS.PLAYER_0, BOARDS.winX)).toBe(false);
    expect(isWinner(PLAYERS.PLAYER_0, BOARDS.win0)).toBe(true);
    expect(isWinner(PLAYERS.PLAYER_0, BOARDS.draw)).toBe(false);
  });

  it('isLooser', () => {
    expect(isLooser(PLAYERS.PLAYER_X, BOARDS.newOne)).toBe(false);
    expect(isLooser(PLAYERS.PLAYER_X, BOARDS.winX)).toBe(false);
    expect(isLooser(PLAYERS.PLAYER_X, BOARDS.win0)).toBe(true);
    expect(isLooser(PLAYERS.PLAYER_X, BOARDS.draw)).toBe(false);

    expect(isLooser(PLAYERS.PLAYER_0, BOARDS.newOne)).toBe(false);
    expect(isLooser(PLAYERS.PLAYER_0, BOARDS.winX)).toBe(true);
    expect(isLooser(PLAYERS.PLAYER_0, BOARDS.win0)).toBe(false);
    expect(isLooser(PLAYERS.PLAYER_0, BOARDS.draw)).toBe(false);
  });

  it('getIndexesByPlayer newOne', () => {
    expect(getIndexesByPlayer(PLAYERS.NOBODY, BOARDS.newOne)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_0, BOARDS.newOne)).toEqual([]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_X, BOARDS.newOne)).toEqual([]);
  });

  it('getIndexesByPlayer winX', () => {
    expect(getIndexesByPlayer(PLAYERS.NOBODY, BOARDS.winX)).toEqual([4, 5, 8]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_0, BOARDS.winX)).toEqual([3, 6, 7]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_X, BOARDS.winX)).toEqual([0, 1, 2]);
  });

  it('getIndexesByPlayer win0', () => {
    expect(getIndexesByPlayer(PLAYERS.NOBODY, BOARDS.win0)).toEqual([8]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_0, BOARDS.win0)).toEqual([2, 3, 4, 6]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_X, BOARDS.win0)).toEqual([0, 1, 5, 7]);
  });

  it('getIndexesByPlayer draw', () => {
    expect(getIndexesByPlayer(PLAYERS.NOBODY, BOARDS.draw)).toEqual([]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_0, BOARDS.draw)).toEqual([1, 4, 6, 8]);
    expect(getIndexesByPlayer(PLAYERS.PLAYER_X, BOARDS.draw)).toEqual([0, 2, 3, 5, 7]);
  });
});
