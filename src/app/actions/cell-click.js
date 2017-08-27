import {
  // rolse
  ROLE_PLAYER_ONE,
} from '../constants/main.js';

export default function cellClick(context, index, hashId) {
  const {
    cells,
    gameStart,
    gameFinish,
    activePlayer,
    twoPlayerMode,
  } = context.state;

  // user cant interact with board before game started
  if (!gameStart || gameFinish) {
    return context.handleWarnUsers();
  }

  // user cant interact context sell that already have value
  if (
    cells[index].value ||
    !twoPlayerMode && activePlayer !== ROLE_PLAYER_ONE ||
    twoPlayerMode && context.state[activePlayer].hash !== hashId
  ) {
    return;
  }

  context.handleCellSetValue(index);
  setTimeout(() => context.handleChangeMove(), 0);
}
