import React, {Component} from 'react';
import Button from 'material-ui/RaisedButton';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import firebase from 'firebase';

import GameConfig from '../game-config';
import GameField from '../game-field';
import GameSettings from '../game-settings';

import computerStrategy, {checkWin} from '../../utils/computer-strategies.js';
import getWinningAxel from '../../utils/get-winning-axels.js';
import getCells from '../../utils/get-cells.js';
import getUniqId from '../../utils/get-uniq-id.js';

import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // values
  VALUE_NOUGHT,
  VALUE_CROSS,
  // config
  defaultGameConfig,
  // debounces
  DEBOUNCE_DEFAULT,
  DEBOUNCE_HARD,
  DEBOUNCE_LITE,
  //
  LOCAL_STORAGE_KEY,
  FIREBASE_CONFIG,
  USER_HASH_LENGTH,
  GAME_HASH_LENGTH,
} from '../../constants/main.js';

import styles from './styles.css';

const HASH_ID = getUniqId(USER_HASH_LENGTH);

export default class NoughtsCrosses extends Component {
  state = {
    ...defaultGameConfig,
  }

  componentWillMount() {
    const url = window.location.href;
    this.gameId = url.substr(url.lastIndexOf('/') + 1, url.length);

    if (this.gameId && this.gameId.length === GAME_HASH_LENGTH) {
      this.handleEnableMultiplayer(null, true, true);

      return;
    }

    this.setState({
      cells: getCells(this.state.defaultFieldSize),
      savedGame: Boolean(window.localStorage.getItem(LOCAL_STORAGE_KEY)),
      hashId: HASH_ID,
    });
  }

  render() {
    const {
      warning,
      twoPlayerMode,
      gameStart,
      activePlayer,
      gameFinish,
      moves,
      defaultFieldSize,
      userFieldSize,
      cells,
      showRefresh,
      winner,
      savedGame,
      gameDisabled,
      uniqLink,
    } = this.state;

    return (
      <section className={styles.root}>
        <main className={styles.inner}>
          <section className={styles.head}>
            <h1>Noughts and Crosses game App</h1>
          </section>
          <section className={styles.configurations}>
            <GameConfig
              handleStartGame={this.handleStartGame}
              gameStart={gameStart}
              defaultFieldSize={defaultFieldSize}
              userFieldSize={userFieldSize}
              handleChangeFieldSize={this.handleChangeFieldSize}
              handleRestartGame={this.handleRestartGame}
              handleRestoreGame={this.handleRestoreGame}
              handleSaveGame={this.handleSaveGame}
              handleToggleGameDisabled={this.handleToggleGameDisabled}
              handleEnableMultiplayer={this.handleEnableMultiplayer}
              savedGame={savedGame}
              gameFinish={gameFinish}
              gameDisabled={gameDisabled}
              showRefresh={showRefresh}
              uniqLink={uniqLink}
              twoPlayerMode={twoPlayerMode}
            />
          </section>
          <section className={styles.gameContainer}>
            <GameField
              cells={cells}
              handleCellClick={this.handleCellClick}
              fieldSize={userFieldSize || defaultFieldSize}
              showRefresh={showRefresh}
              gameStart={gameStart}
              warning={warning}
              gameFinish={gameFinish}
              winner={winner}
             />
            <GameSettings
              gameStart={gameStart}
              twoPlayerMode={twoPlayerMode}
              playerOne={this.state[ROLE_PLAYER_ONE].value}
              playerTwo={this.state[ROLE_PLAYER_TWO].value}
              computer={this.state[ROLE_PLAYER_PC].value}
              activePlayer={activePlayer}
              moves={moves}
            />
          </section>
        </main>
      </section>
    );
  }

  handleWarnUsers = () => {
    this.handleSetState({
      warning: 'Click "Start Game" button before making moves!'
    })
  }

  handleStartGame = () => {
    const {
      twoPlayerMode,
      defaultFieldSize,
      userFieldSize,
      gameDisabled,
    } = this.state;

    if (gameDisabled) {
      return;
    }

    this.handleToggleRefresh();

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
      this.handleSetState({
        gameStart: true,
        [crossPlayerName]: {
          ...this.state[crossPlayerName],
          value: VALUE_CROSS
        },
        [noughtsPlayerName]: {
          ...this.state[noughtsPlayerName],
          value: VALUE_NOUGHT
        },
        activePlayer: crossPlayerName,
        players,
        warning: null,
        userFieldSize: userFieldSize || defaultFieldSize
      }, () => {
        if (this.state.activePlayer === ROLE_PLAYER_PC) {
          this.handleComputerMove();
        }

        this.handleToggleRefresh();
      });
    }, DEBOUNCE_DEFAULT);
  }

  handleGameFinish = ({value}) => {
    let winner;

    switch (value) {
      case this.state[ROLE_PLAYER_ONE].value:
        winner = ROLE_PLAYER_ONE;
        break;
      case this.state[ROLE_PLAYER_TWO].value:
        winner = ROLE_PLAYER_TWO;
        break;
      case this.state[ROLE_PLAYER_PC].value:
        winner = ROLE_PLAYER_PC;
        break;
      default:

    }

    this.handleSetState({
      gameStart: true,
      gameFinish: true,
      winner,
    });
  }

  handleRestartGame = () => {
    this.handleToggleRefresh();

    setTimeout(() => {
      this.handleSetState({
        ...defaultGameConfig,
        [ROLE_PLAYER_ONE]: {
          ...this.state[ROLE_PLAYER_ONE],
          value: null,
        },
        [ROLE_PLAYER_TWO]: {
          ...this.state[ROLE_PLAYER_TWO],
          value: null,
        },
        twoPlayerMode: this.state.twoPlayerMode,
        userFieldSize: this.state.userFieldSize,
        cells: getCells(this.state.userFieldSize),
      }, () => {
        this.handleStartGame();
        this.handleToggleRefresh();
      })
    }, DEBOUNCE_DEFAULT)
  }

  handleComputerMove = () => {
    const {
      cells,
      userFieldSize,
    } = this.state;

    const index = computerStrategy(
      cells,
      this.state[ROLE_PLAYER_PC].value,
      this.state[ROLE_PLAYER_ONE].value,
      userFieldSize
    );

    this.handleCellSetValue(index);
    this.handleChangeMove();
  }

  handleCellClick = (index) => {
    const {
      cells,
      gameStart,
      gameFinish,
      activePlayer,
      twoPlayerMode,
    } = this.state;

    // user cant interact with board before game started
    if (!gameStart || gameFinish) {
      return this.handleWarnUsers();
    }

    // user cant interact this sell that already have value
    if (
      cells[index].value ||
      !twoPlayerMode && activePlayer !== ROLE_PLAYER_ONE ||
      twoPlayerMode && this.state[activePlayer].hash !== HASH_ID
    ) {
      return;
    }

    this.handleCellSetValue(index);
    setTimeout(() => this.handleChangeMove(), 0);
  }

  handleCellSetValue = (index) => {
    const {
      cells,
      activePlayer,
      moves,
    } = this.state;

    // change clicked cell value
    cells[index].value = this.state[activePlayer].value;

    this.handleSetState({
      cells: [
        ...cells,
      ],
      moves: moves + 1,
    })
  }

  handleChangeMove = () => {
    const {
      players,
      activePlayer,
      cells,
      userFieldSize,
      moves,
    } = this.state;

    const win = checkWin(
      cells,
      this.state[ROLE_PLAYER_ONE].value,
      this.state[ROLE_PLAYER_PC].value || this.state[ROLE_PLAYER_TWO].value,
      userFieldSize
    );

    if (win || moves === cells.length) {
      return this.handleGameFinish(win);
    }

    const nextActivePlayer = players.find((player) => player !== activePlayer);

    this.handleSetState({
      activePlayer: nextActivePlayer,
    }, () => {
      if (this.state.activePlayer === ROLE_PLAYER_PC) {
        setTimeout(() => this.handleComputerMove(), DEBOUNCE_HARD);
      }
    });
  }

  handleToggleRefresh = () => {
    this.handleSetState({
      showRefresh: !this.state.showRefresh
    });
  }

  handleSaveGame = () => {
    const gameState = JSON.stringify({...this.state});

    window.localStorage.setItem(LOCAL_STORAGE_KEY, gameState);

    this.setState({
      savedGame: true,
    });
  }

  handleRestoreGame = () => {
    const gameState = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY));

    this.setState({...gameState});

    window.localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  handleEnableMultiplayer = (event, state, connect) => {
    if (!state) {
      return;
    }

    // if both players have hash, that's mean they connected, third one Cantplay, sorry
    if (this.state[ROLE_PLAYER_ONE].hash && this.state[ROLE_PLAYER_TWO].hash) {
      return;
    }

    const currentPlayer = connect ? ({
      ...this.state[ROLE_PLAYER_ONE],
      hash: HASH_ID,
      inOnline: true,
    }) : ({
      ...this.state[ROLE_PLAYER_TWO],
      hash: HASH_ID,
      inOnline: true,
    });

    // initializing firabase and database
    firebase.initializeApp(FIREBASE_CONFIG);
    this.database = firebase.database();
    this.gameId = this.gameId && this.gameId.length === GAME_HASH_LENGTH ?
      this.gameId : getUniqId(GAME_HASH_LENGTH);

    this.setState({
      twoPlayerMode: true,
      gameId: this.gameId,
    }, () => {

      if (connect) {
        this.database.ref(`${this.gameId}/uniqLink`).set(false);
        this.database.ref(`${this.gameId}/${ROLE_PLAYER_TWO}`).set({
          ...currentPlayer
        });
      } else {
        this.database.ref(this.gameId).set({
          ...this.state,
          uniqLink: `${window.location.href}${this.gameId}`,
          [ROLE_PLAYER_ONE] : {
            ...currentPlayer,
          }
        });
      }

      this.database.ref(this.gameId).on(
        'value',
        (snapshot) => this.handleUpdateState(snapshot)
      );
    });

  }

  handleUpdateState = (data) => {
    const state = data.val();

    if (state) {
      this.setState({
        ...state,
      });
    }

    return data;
  }

  handleSetState = (state, cb = noop) => {
    this.setState({
      ...state,
    }, () => {
      if (this.state.twoPlayerMode) {
        firebase.database().ref(this.gameId).set({...this.state});
      }

      cb();
    });
  }

  handleToggleGameDisabled = debounce(() => {
    this.handleSetState({
      gameDisabled: !this.state.gameDisabled,
    });
  }, DEBOUNCE_LITE, {leading: true, trailing: true})

  handleChangeFieldSize = debounce((event, value) => {
    this.handleSetState({
      userFieldSize: value,
      cells: getCells(value),
    });
  }, DEBOUNCE_LITE)
}
