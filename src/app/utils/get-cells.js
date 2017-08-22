// generate cells by board side
export default function getCells(side) {
  const cells = [];

  for (let y = 0; y < side; y++) {
    for (let x = 0; x < side; x++) {
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
