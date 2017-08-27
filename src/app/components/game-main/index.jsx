import React, {Component} from 'react';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';
import firebase from 'firebase';

import GameConfig from '../game-config';
import GameField from '../game-field';
import GameSettings from '../game-settings';

import startGame from '../../actions/start-game.js';
import finishGame from '../../actions/finish-game.js';
import restartGame from '../../actions/restart-game.js';
import cellClick from '../../actions/cell-click.js';
import cellSetValue from '../../actions/cell-set-value.js';
import changeMove from '../../actions/change-move.js';
import enableMultiplayer from '../../actions/enable-multiplayer.js';

import computerStrategy from '../../utils/computer-strategies.js';
import getCells from '../../utils/get-cells.js';
import getUniqId from '../../utils/get-uniq-id.js';

import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // config
  DEFAULT_GAME_CONFIG,
  // debounces
  DEBOUNCE_LITE,
  //
  LOCAL_STORAGE_KEY,
  USER_HASH_LENGTH,
  GAME_HASH_LENGTH,
} from '../../constants/main.js';

import styles from './styles.css';

const HASH_ID = getUniqId(USER_HASH_LENGTH);

export default class NoughtsCrosses extends Component {
  state = {
    ...DEFAULT_GAME_CONFIG,
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
    startGame(this);
  }

  handleGameFinish = ({value}) => {
    finishGame(this, value);
  }

  handleRestartGame = () => {
    restartGame(this);
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
    cellClick(this, index, HASH_ID);
  }

  handleCellSetValue = (index) => {
    cellSetValue(this, index);
  }

  handleChangeMove = () => {
    changeMove(this);
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

  handleEnableMultiplayer = (event, state, connect = false) => {
    if (!state) {
      return;
    }

    enableMultiplayer(this, event, state, connect, HASH_ID);
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
