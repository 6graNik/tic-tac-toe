import React from 'react';
import Toggle from 'material-ui/Toggle';
import cx from 'classnames';

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
    moves,
  } = props;

  return (
    <section className={styles.gameSettings}>
      <div className={cx(styles.figuresConfig, {[styles.unactive]: !gameStart})}>
        {gameStart && <div className={styles.bold}>Current Move: {activePlayer};</div>}
        <div>
          Player One:
          <Figure value={playerOne}/>
        </div>
        {twoPlayerMode ? (
          <div>
            Player Two:
            <Figure value={playerTwo}/>
          </div>
        ) : (
          <div>
            Computer:
            <Figure value={computer}/>
          </div>
        )}
        <div>Total moves: {moves}</div>
      </div>
    </section>
  );
}

function Figure({value}) {
  switch (value) {
    case VALUE_NOUGHT: {
      return <div className={cx(styles.figure, styles.nought)}></div>;
    }

    case VALUE_CROSS: {
      return <div className={cx(styles.figure, styles.cross)}></div>
    }

    default: {
      return <span />;
    }
  }
}
