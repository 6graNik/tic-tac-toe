import {
  // debounces
  DEBOUNCE_DEFAULT,
  // configs
  DEFAULT_GAME_CONFIG
} from '../constants/main.js';

import getCells from '../utils/get-cells.js';

export default function resetGame(context) {
  context.handleToggleRefresh();

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
