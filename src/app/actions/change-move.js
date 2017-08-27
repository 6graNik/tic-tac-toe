import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // debounces
  DEBOUNCE_HARD
} from '../constants/main.js';

import {checkWin} from '../utils/computer-strategies.js';

export default function changeMove(context) {
  const {
    players,
    activePlayer,
    cells,
    userFieldSize,
    moves,
  } = context.state;

  const win = checkWin(
    cells,
    context.state[ROLE_PLAYER_ONE].value,
    context.state[ROLE_PLAYER_PC].value || context.state[ROLE_PLAYER_TWO].value,
    userFieldSize
  );

  if (win || moves === cells.length) {
    return context.handleGameFinish(win);
  }

  const nextActivePlayer = players.find((player) => player !== activePlayer);

  context.handleSetState({
    activePlayer: nextActivePlayer,
  }, () => {
    if (context.state.activePlayer === ROLE_PLAYER_PC) {
      setTimeout(() => context.handleComputerMove(), DEBOUNCE_HARD);
    }
  });
}
