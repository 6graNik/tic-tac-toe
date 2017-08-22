import React, {Component} from 'react';
import Button from 'material-ui/RaisedButton';
import debounce from 'lodash/debounce';

import Configurations from '../configurations';
import GameField from '../game-field';
import GameSettings from '../game-settings';

import computerStrategy, {checkWin} from '../../utils/computer-strategies.js';
import getWinningAxel from '../../utils/get-winning-axels.js';
import getCells from '../../utils/get-cells.js';

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
  //
  LOCAL_STORAGE_KEY,
  // debounces
  DEBOUNCE_DEFAULT,
  DEBOUNCE_HARD,
  DEBOUNCE_LITE,
} from '../../constants/main.js';

import styles from './styles.css';

export default class NoughtsCrosses extends Component {
  state = {
    ...defaultGameConfig,
  }

  componentWillMount() {
    this.setState({
      cells: getCells(this.state.defaultFieldSize),
      savedGame: Boolean(window.localStorage.getItem(LOCAL_STORAGE_KEY)),
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
    } = this.state;

    return (
      <section className={styles.root}>
        <main className={styles.inner}>
          <section className={styles.head}>
            <h1>Noughts and Crosses game App</h1>
          </section>
          <section className={styles.configurations}>
            <Configurations
              handleStartGame={this.handleStartGame}
              gameStart={gameStart}
              defaultFieldSize={defaultFieldSize}
              userFieldSize={userFieldSize}
              handleChangeFieldSize={this.handleChangeFieldSize}
              handleRestartGame={this.handleRestartGame}
              handleRestoreGame={this.handleRestoreGame}
              handleSaveGame={this.handleSaveGame}
              savedGame={savedGame}
              gameFinish={gameFinish}
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
              playerOne={this.state[ROLE_PLAYER_ONE]}
              playerTwo={this.state[ROLE_PLAYER_TWO]}
              computer={this.state[ROLE_PLAYER_PC]}
              activePlayer={activePlayer}
              moves={moves}
            />
          </section>
        </main>
      </section>
    );
  }

  handleWarnUsers = () => {
    this.setState({
      warning: 'Click "Start Game" button before making moves!'
    })
  }

  handleStartGame = () => {
    const {
      twoPlayerMode,
      defaultFieldSize,
      userFieldSize,
    } = this.state;

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
      this.setState({
        gameStart: true,
        [crossPlayerName]: VALUE_CROSS,
        [noughtsPlayerName]: VALUE_NOUGHT,
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
      case this.state[ROLE_PLAYER_ONE]:
        winner = ROLE_PLAYER_ONE;
        break;
      case this.state[ROLE_PLAYER_TWO]:
        winner = ROLE_PLAYER_TWO;
        break;
      case this.state[ROLE_PLAYER_PC]:
        winner = ROLE_PLAYER_PC;
        break;
      default:

    }

    this.setState({
      gameStart: true,
      gameFinish: true,
      winner,
    });
  }

  handleRestartGame = () => {
    this.handleToggleRefresh();

    setTimeout(() => {
      this.setState({
        ...defaultGameConfig,
        userFieldSize: this.state.userFieldSize,
        cells: getCells(this.state.defaultFieldSize),
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
      this.state[ROLE_PLAYER_PC],
      this.state[ROLE_PLAYER_ONE],
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
    } = this.state;

    // user cant interact with board before game started
    if (!gameStart || gameFinish) {
      return this.handleWarnUsers();
    }

    // user cant interact this sell that already have value
    if (cells[index].value || activePlayer !== ROLE_PLAYER_ONE) {
      return;
    }

    this.handleCellSetValue(index);
    this.handleChangeMove();
  }

  handleCellSetValue = (index) => {
    const {
      cells,
      activePlayer,
      moves,
    } = this.state;

    // change clicked cell value
    cells[index].value = this.state[activePlayer];

    this.setState({
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
      this.state[ROLE_PLAYER_ONE],
      this.state[ROLE_PLAYER_PC] || this.state[ROLE_PLAYER_TWO],
      userFieldSize
    );

    if (win || moves === cells.length) {
      return this.handleGameFinish(win);
    }

    const nextActivePlayer = players.find((player) => player !== activePlayer);

    this.setState({
      activePlayer: nextActivePlayer,
    }, () => {
      if (this.state.activePlayer === ROLE_PLAYER_PC) {
        setTimeout(() => this.handleComputerMove(), DEBOUNCE_HARD);
      }
    });
  }

  handleToggleRefresh = () => {
    this.setState({
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

  handleChangeFieldSize = debounce((event, value) => {
    this.setState({
      userFieldSize: value,
      cells: getCells(value),
    });
  }, DEBOUNCE_LITE)
}
