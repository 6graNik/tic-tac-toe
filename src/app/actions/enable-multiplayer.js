import firebase from 'firebase';

import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  //
  GAME_HASH_LENGTH,
  FIREBASE_CONFIG
} from '../constants/main.js';

import getUniqId from '../utils/get-uniq-id.js';

export default function enableMultiplayer(context, event, state, connect, hash) {
  // if both players have hash, that's mean they connected, third one Cantplay, sorry
  if (context.state[ROLE_PLAYER_ONE].hash && context.state[ROLE_PLAYER_TWO].hash) {
    return;
  }

  const currentPlayer = !connect ? ({
    ...context.state[ROLE_PLAYER_ONE],
    hash,
    inOnline: true,
  }) : ({
    ...context.state[ROLE_PLAYER_TWO],
    hash,
    inOnline: true,
  });

  // initializing firabase and database
  firebase.initializeApp(FIREBASE_CONFIG);
  context.database = firebase.database();
  context.gameId = context.gameId && context.gameId.length === GAME_HASH_LENGTH ?
    context.gameId : getUniqId(GAME_HASH_LENGTH);

  context.setState({
    twoPlayerMode: true,
    gameId: context.gameId,
  }, () => {

    if (connect) {
      // update player two info in db and clear link
      context.database.ref(`${context.gameId}/uniqLink`).set(false);
      context.database.ref(`${context.gameId}/connected`).set(true);
      context.database.ref(`${context.gameId}/${ROLE_PLAYER_TWO}`).set({
        ...currentPlayer
      });
    } else {
      context.database.ref(context.gameId).set({
        ...context.state,
        uniqLink: `${window.location.href}?${context.gameId}`,
        [ROLE_PLAYER_ONE] : {
          ...currentPlayer,
        }
      });
    }

    context.database.ref(context.gameId).on(
      'value',
      (snapshot) => context.handleUpdateState(snapshot)
    );
  });
}
