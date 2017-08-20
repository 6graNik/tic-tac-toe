import {winingAxelsByIndex} from '../../../constants/main.js'

const strategies = [
  moveToWin,
  userDefence,
  takeMostAxels,
  takeEmpty,
];

const MINIMAL_MOVES_COUNT_FOR_WIN = 5;

export default function computerStrategy(cells, value, userValue) {
  for (let i = 0; i < strategies.length; i++) {
    // run all strategies by order
    const index = strategies[i](cells, value, userValue);

    if (index || index === 0) {
      return index;
    }
  }
}

// This strategy applyable when computer can win by one move
// iterate each cell by index in axel arr, compare its value and computer current figure
// if in axel we left with one empty cell, then our strategy can be applyed
function moveToWin(cells, value) {
  for (let i = 0; i < winingAxelsByIndex.length; i++) {
    const axel = winingAxelsByIndex[i];
    let elementAxelIndex = null;

    const filteredAxel = axel.filter(
      (index) => {
        if (cells[index].value === value) {
          return true;
        }

        if (!cells[index].value && elementAxelIndex === null) {
          elementAxelIndex = index;
          return true;
        }

        return false;
      }
    );

    if (filteredAxel.length === 3) {
      return cells[elementAxelIndex].i;
    }
  }

  return false;
}

// This strategy will defend completing axel by user
// it's the same nove to win strategy by logic
function userDefence(cells, value, userValue) {
  return moveToWin(cells, userValue);
}

// This strategy trying to take position this covering most count of axels
function takeMostAxels(cells) {
  const center = Math.floor(cells.length / 2);
  const boardSide = 3;

  if (!cells[center].value) {
    return center;
  }

  const corners = [];
  corners[0] = cells[0];
  corners[boardSide - 1] = cells[boardSide - 1];
  corners[cells.length - boardSide] = cells[cells.length - boardSide];
  corners[cells.length - 1] = cells[cells.length - 1];

  const emptyCorners = corners.filter(({i: index}) => !cells[index].value);

  // if there is an empty corners, strategy will randomly take one
  if (emptyCorners.length > 0) {
    return emptyCorners[Math.floor(Math.random() * emptyCorners.length)].i;
  }
}

// This strategy takes random empty cell
function takeEmpty(cells) {
  const emptyCells = cells.filter((cell) => !cell.value);

  if (emptyCells.length > 0) {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)].i;
  }
}

// This function just checks is there winner or not
export function checkWin(cells, value, userValue) {
  const cellsThisValue = cells.filter((cell) => cell.value);

  // Min count of moves to win the game
  if (cellsThisValue.length < MINIMAL_MOVES_COUNT_FOR_WIN) {
    return false;
  }

  const values = [value, userValue];

  for (let i = 0; i < winingAxelsByIndex.length; i++) {
    const axel = winingAxelsByIndex[i];

    for (let j = 0; j < values.length; j++) {
      const winValue = values[j];
      const filteredAxel = axel.filter((index) => cells[index].value === winValue);

      if (filteredAxel.length === axel.length) {
        return {
          win: true,
          value: winValue,
        }
      }j
    }
  }

  return false;
}
