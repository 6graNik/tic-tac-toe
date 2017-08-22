export default function getWinningAxel (side = 3) {
  const horizontalAxels = {};
  const verticalAxels = {};
  const diagonalAxels = {
    0: [],
    1: []
  };

  for (let i = 0; i < side; i++) {
    horizontalAxels[i] = [];
    verticalAxels[i] = [];
  }

  const totalCountOfCells = side * side;

  let currentLine = 1;

  for (let i = 0; i < totalCountOfCells; i++) {
    if (i >= side * currentLine) {
      ++currentLine;
    }

    if (i <= side * currentLine) {
      horizontalAxels[currentLine - 1].push(i);
      verticalAxels[i - ((currentLine - 1) * side)].push(i);
    }
  }

  for (let i = 0; i < side; i++) {
    let j = i + 1;

    diagonalAxels[0].push((side * i) + i);
    diagonalAxels[1].push((side * j) - j);
  }

  const horizontalAxelsArr = Object.keys(horizontalAxels).map((key) => horizontalAxels[key]);
  const verticalAxelsArr = Object.keys(verticalAxels).map((key) => verticalAxels[key]);
  const diagonalAxelsArr = Object.keys(diagonalAxels).map((key) => diagonalAxels[key]);

  return [
    ...horizontalAxelsArr,
    ...verticalAxelsArr,
    ...diagonalAxelsArr
  ];
}
