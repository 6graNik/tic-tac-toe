import {
  // debounces
  DEBOUNCE_DEFAULT,
  // configs
  DEFAULT_GAME_CONFIG
} from '../constants/main.js';

import getCells from '../utils/get-cells.js';

export default function resetGame(context) {
  context.handleToggleRefresh();

  if (context.database) {
    context.database.ref(context.gameId).off('value');
  }

  setTimeout(() => {
    context.handleSetState({
      ...DEFAULT_GAME_CONFIG,
      showRefresh: true,
      cells: getCells(DEFAULT_GAME_CONFIG.defaultFieldSize)
    }, () => {
      context.handleToggleRefresh();
    })
  }, DEBOUNCE_DEFAULT)
}
