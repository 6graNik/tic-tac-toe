import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // values
  VALUE_NOUGHT,
  VALUE_CROSS,
  // debounces
  DEBOUNCE_DEFAULT,
} from '../constants/main.js';

export default function startGame(context) {
  const {
    twoPlayerMode,
    defaultFieldSize,
    userFieldSize,
    gameDisabled,
  } = context.state;

  if (gameDisabled) {
    return;
  }

  context.handleToggleRefresh();

  let players = [];

  if (twoPlayerMode) {
    players = [
      ROLE_PLAYER_ONE,
      ROLE_PLAYER_TWO,
    ];
  } else {
    players = [
      ROLE_PLAYER_ONE,
      ROLE_PLAYER_PC,
    ];
  }

  const randomIndex = Math.floor(Math.random() * 2);

  // the one who's index win will be playing with cross and begining the game
  const crossPlayerName = players[randomIndex];
  // the second one will be playing noughts
  const noughtsPlayerName = players.find((player) => player !== crossPlayerName);

  setTimeout(() => {
    context.handleSetState({
      gameStart: true,
      [crossPlayerName]: {
        ...context.state[crossPlayerName],
        value: VALUE_CROSS
      },
      [noughtsPlayerName]: {
        ...context.state[noughtsPlayerName],
        value: VALUE_NOUGHT
      },
      activePlayer: crossPlayerName,
      players,
      warning: null,
      userFieldSize: userFieldSize || defaultFieldSize
    }, () => {
      if (context.state.activePlayer === ROLE_PLAYER_PC) {
        context.handleComputerMove();
      }

      context.handleToggleRefresh();
    });
  }, DEBOUNCE_DEFAULT);
}
