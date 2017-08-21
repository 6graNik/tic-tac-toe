import React, {Component} from 'react';
import Button from 'material-ui/RaisedButton';
import debounce from 'lodash/debounce';

import Configurations from '../configurations';
import GameField from '../game-field';
import GameSettings from '../game-settings';

import computerStrategy, {checkWin} from './utils/computer-strategies.js';
import getWinningAxel from './utils/get-winning-axels.js';
import getCells from './utils/get-cells.js';

import {
  // rolse
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
  ROLE_PLAYER_PC,
  // values
  VALUE_NOUGHT,
  VALUE_CROSS,
} from '../../constants/main.js';

import styles from './styles.css';

export default class NoughtsCrosses extends Component {
  state = {
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
  }

  componentWillMount() {
    this.setState({
      cells: getCells(this.state.defaultFieldSize),
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
            />
            {warning && <span className={styles.warning}>{warning}</span>}
          </section>
          <section className={styles.gameContainer}>
            <GameField
              cells={cells}
              handleCellClick={this.handleCellClick}
              fieldSize={userFieldSize || defaultFieldSize}
             />
            <GameSettings
              gameStart={gameStart}
              handleUndoMove={this.handleUndoMove}
              twoPlayerMode={twoPlayerMode}
              playerOne={this.state[ROLE_PLAYER_ONE]}
              playerTwo={this.state[ROLE_PLAYER_TWO]}
              computer={this.state[ROLE_PLAYER_PC]}
              activePlayer={activePlayer}
              moves={moves.length}
            />
          </section>
        </main>
        {gameFinish && <span>Game Over</span>}
      </section>
    );
  }

  handleWarnUsers = () => {
    this.setState({
      warning: 'Click "Start Game" button before making activePlayers!'
    })
  }

  handleStartGame = () => {
    const {
      twoPlayerMode,
      defaultFieldSize,
      userFieldSize,
    } = this.state;

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
    });
  }


  handleGameFinish = () => {
    this.setState({
      gameStart: true,
      gameFinish: true,
    });
  }

  handleComputerMove = () => {
    const {
      cells,
    } = this.state;

    const index = computerStrategy(cells, this.state[ROLE_PLAYER_PC], this.state[ROLE_PLAYER_ONE]);

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
    } = this.state;

    // change clicked cell value
    cells[index].value = this.state[activePlayer];
    this.state.moves.push({
      ...this.state,
      cells: [...cells],
    });

    this.setState({
      cells: [
        ...cells,
      ],
      moves: [...this.state.moves],
    })
  }

  handleChangeMove = () => {
    const {
      players,
      activePlayer,
      cells,
      userFieldSize,
    } = this.state;

    const win = checkWin(
      cells,
      this.state[ROLE_PLAYER_ONE],
      this.state[ROLE_PLAYER_PC] || this.state[ROLE_PLAYER_TWO],
      userFieldSize
    );

    if (win) {
      return this.handleGameFinish();
    }

    const nextActivePlayer = players.find((player) => player !== activePlayer);

    this.setState({
      activePlayer: nextActivePlayer,
    }, () => {
      if (this.state.activePlayer === ROLE_PLAYER_PC) {
        setTimeout(() => this.handleComputerMove(), 800);
      }
    });
  }

  handleUndoMove = () => {
    const {
      moves,
    } = this.state;

    this.setState({
      ...moves[0],
    });
  }

  handleChangeFieldSize = debounce((event, value) => {
    this.setState({
      userFieldSize: value,
      cells: getCells(value),
    });
  }, 300)
}
