export function getCells() {
  const cells = [];

  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
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


export const VALUE_NOUGHT = 'Noight';
export const VALUE_CROSS = 'Cross';
