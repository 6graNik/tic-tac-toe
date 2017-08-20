import React from 'react';
import Toggle from 'material-ui/Toggle';
import cx from 'classnames';

import Button from 'material-ui/RaisedButton';

import {
  VALUE_NOUGHT,
  VALUE_CROSS,
} from '../../constants/main.js';

import styles from './styles.css';

export default function GameSettings(props) {
  const {
    twoPlayerMode,
    playerOne,
    playerTwo,
    computer,
    gameStart,
    activePlayer,
    handleUndoMove,
    moves,
  } = props;

  return (
    <section className={styles.gameSettings}>
      <Button onClick={handleUndoMove} label="Undo last step" disabled={!gameStart}/>
      <div className={cx(styles.figuresConfig, {[styles.unactive]: !gameStart})}>
        {gameStart && <div className={styles.bold}>Current Move: {activePlayer};</div>}
        <div>Player One: {playerOne || 'not configurate'};</div>
        <div>{twoPlayerMode && `Player Two: ${playerTwo || 'not configurate'};`}</div>
        <div>{!twoPlayerMode && `Computer: ${computer || 'not configurate'};`}</div>
        <div>Total moves: {moves}</div>
      </div>
    </section>
  );
}
