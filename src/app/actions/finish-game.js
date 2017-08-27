import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
} from '../constants/main.js';

export default function finishGame(context, winingValue) {
  let winner;

  switch (winingValue) {
    case context.state[ROLE_PLAYER_ONE].value:
      winner = ROLE_PLAYER_ONE;
      break;
    case context.state[ROLE_PLAYER_TWO].value:
      winner = ROLE_PLAYER_TWO;
      break;
    case context.state[ROLE_PLAYER_PC].value:
      winner = ROLE_PLAYER_PC;
      break;
    default:

  }

  context.handleSetState({
    gameStart: true,
    gameFinish: true,
    winner,
  });
}
