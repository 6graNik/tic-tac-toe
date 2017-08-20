export function getCells() {
  const cells = [];

  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      cells.push({
        x,
        y,
        i: cells.length,
        value: null,
      })
    }
  }

  return cells;
};

export const winingAxelsByIndex = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
];

export const VALUE_NOUGHT = 'noight';
export const VALUE_CROSS = 'cross';

export const ROLE_PLAYER_ONE = 'playerOne';
export const ROLE_PLAYER_TWO = 'playerTwo';
export const ROLE_PLAYER_PC = 'computer';
