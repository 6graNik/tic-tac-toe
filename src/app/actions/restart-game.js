import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // debounces
  DEBOUNCE_DEFAULT,
  // configs
  DEFAULT_GAME_CONFIG
} from '../constants/main.js';

import getCells from '../utils/get-cells.js';

export default function restartGame(context) {
  context.handleToggleRefresh();

  setTimeout(() => {
    context.handleSetState({
      ...DEFAULT_GAME_CONFIG,
      [ROLE_PLAYER_ONE]: {
        ...context.state[ROLE_PLAYER_ONE],
        value: null,
      },
      [ROLE_PLAYER_TWO]: {
        ...context.state[ROLE_PLAYER_TWO],
        value: null,
      },
      twoPlayerMode: context.state.twoPlayerMode,
      userFieldSize: context.state.userFieldSize,
      cells: getCells(context.state.userFieldSize),
    }, () => {
      context.handleStartGame();
      context.handleToggleRefresh();
    })
  }, DEBOUNCE_DEFAULT)
}
