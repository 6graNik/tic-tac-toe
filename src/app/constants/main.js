export const LOCAL_STORAGE_KEY = 'tic-tac-toe-app';

export const VALUE_NOUGHT = 'noight';
export const VALUE_CROSS = 'cross';

export const ROLE_PLAYER_ONE = 'Player One';
export const ROLE_PLAYER_TWO = 'Player Two';
export const ROLE_PLAYER_PC = 'Computer';

export const DEBOUNCE_DEFAULT = 500;
export const DEBOUNCE_HARD = 800;
export const DEBOUNCE_LITE = 800;

export const USER_HASH_LENGTH = 5;
export const GAME_HASH_LENGTH = 10;

export const defaultGameConfig = {
  cells: [],
  moves: 0,
  gameStart: false,
  gameFinish: false,
  twoPlayerMode: false,
  activePlayer: null,
  warning: null,
  // here we will write which figure each one will have
  [ROLE_PLAYER_ONE]: {
    value: null,
    isOnline: false,
    hash: null,
    name: null,
  },
  [ROLE_PLAYER_TWO]: {
    value: null,
    isOnline: false,
    hash: null,
    name: null,
  },
  [ROLE_PLAYER_PC]: {
    value: null,
    isOnline: false,
    hash: null,
    name: null,
  },
  //
  defaultFieldSize: 3,
  userFieldSize: null,
  showRefresh: false,
  gameDisabled: false,
};

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDpUD5vSIZxCaVTGG1uBYNuvECmwDfzToE",
  authDomain: "tic-tac-toe-56c5a.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-56c5a.firebaseio.com",
};
