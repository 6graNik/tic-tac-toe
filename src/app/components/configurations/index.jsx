import React from 'react';
import Toggle from 'material-ui/Toggle';
import Button from 'material-ui/RaisedButton';
import cx from 'classnames';

import styles from './styles.css';

export default function Configurations(props) {
  const {
    handleStartGame,
    twoPlayerMode,
    playerOne,
    playerTwo,
    computer,
    gameStart,
    activePlayer,
  } = props;

  return (
    <ul className={styles.root}>
      <li className={styles.item}>
        <h2 className={styles.header}>
          <span>Enable second player</span>
          <div className={styles.input}>
            <Toggle />
          </div>
        </h2>
      </li>
      <li className={styles.item}>
        <h2 className={styles.header}>
          <div className={styles.input}>
            <Button
              label="Start Game"
              onClick={handleStartGame}
              primary
              />
            <Button
              label="Continue Game"
              />
          </div>
        </h2>
      </li>
      <li className={styles.item}>
        <h2 className={styles.header}>
          <div className={cx(styles.figuresConfig, {[styles.unactive]: !gameStart})}>
            {gameStart && <span>Current Move: {activePlayer};</span>}
            <span>Player One: {playerOne || 'not configurate'};</span>
            <span>{twoPlayerMode && `Player Two: ${playerTwo || 'not configurate'}`};</span>
            <span>{!twoPlayerMode && `Computer: ${computer || 'not configurate'}`};</span>
          </div>
        </h2>
      </li>
    </ul>
  );
}
