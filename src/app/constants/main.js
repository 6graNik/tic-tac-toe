export const VALUE_NOUGHT = 'noight';
export const VALUE_CROSS = 'cross';

export const ROLE_PLAYER_ONE = 'playerOne';
export const ROLE_PLAYER_TWO = 'playerTwo';
export const ROLE_PLAYER_PC = 'computer';

export const defaultGameConfig = {
  cells: [],
  moves: [],
  gameStart: false,
  gameFinish: false,
  twoPlayerMode: false,
  activePlayer: null,
  warning: null,
  // here we will write which figure each one will have
  [ROLE_PLAYER_ONE]: null,
  [ROLE_PLAYER_TWO]: null,
  [ROLE_PLAYER_PC]: null,
  //
  defaultFieldSize: 3,
  userFieldSize: null,
  showRefresh: false,
};
