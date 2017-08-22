import React from 'react';
import Toggle from 'material-ui/Toggle';
import Button from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import cx from 'classnames';

import styles from './styles.css';

export default function Configurations(props) {
  const {
    handleStartGame,
    handleRestartGame,
    handleRestoreGame,
    handleSaveGame,
    defaultFieldSize,
    userFieldSize,
    handleChangeFieldSize,
    gameStart,
    savedGame,
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
        <h2 className={cx(styles.header, styles.headerSlider)}>
          <span>Choose field size: {userFieldSize || defaultFieldSize}</span>
          <div className={cx(styles.input, styles.inputSlider)}>
            <Slider
              disabled={gameStart}
              onChange={handleChangeFieldSize}
              default={defaultFieldSize}
              min={3}
              max={7}
              step={1}
            />
          </div>
        </h2>
      </li>
      <li className={styles.item}>
        <div className={styles.input}>
          <Button
            label="Start Game"
            onClick={handleStartGame}
            disabled={gameStart}
            primary
            />
            <Button
              label="Restart Game"
              onClick={handleRestartGame}
              disabled={!gameStart}
              secondary
              />
          <Button
            label={savedGame ? "Continue Game" : "Save Game"}
            onClick={savedGame ? handleRestoreGame : handleSaveGame}
            />
        </div>
      </li>


    </ul>
  );
}
