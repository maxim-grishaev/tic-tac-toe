import { nextMove } from './player';
import { PLAYERS } from './board';

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

describe('Player', () => {
  it('nextMove: null', () => {
    const board = convertToBoard(`
      X X X
      0 X 0
      X 0 0
    `);
    expect(nextMove(board, PLAYERS.PLAYER_0)).toBeNull();
    expect(nextMove(board, PLAYERS.PLAYER_X)).toBeNull();
  });

  it('nextMove: 2', () => {
    const board = convertToBoard(`
      X X .
      . . 0
      . . 0
    `);
    expect(nextMove(board, PLAYERS.PLAYER_0)).toBe(2);
    expect(nextMove(board, PLAYERS.PLAYER_X)).toBe(2);
  });

  it('nextMove: 6', () => {
    const board = convertToBoard(`
      X 0 X
      0 X 0
      . . 0
    `);
    expect(nextMove(board, PLAYERS.PLAYER_0)).toBe(6);
    expect(nextMove(board, PLAYERS.PLAYER_X)).toBe(6);
  });
});
