import React from 'react';
import Toggle from 'material-ui/Toggle';
import Button from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import cx from 'classnames';

import styles from './styles.css';

export default function GameConfig(props) {
  const {
    handleStartGame,
    handleRestartGame,
    handleRestoreGame,
    handleSaveGame,
    defaultFieldSize,
    userFieldSize,
    handleChangeFieldSize,
    handleToggleGameDisabled,
    handleEnableMultiplayer,
    gameStart,
    gameFinish,
    savedGame,
    gameDisabled,
    showRefresh,
    twoPlayerMode,
    uniqLink,
  } = props;

  return (
    <ul className={styles.root}>
      <li className={styles.item}>
        <h2 className={cx(styles.header, styles.headerSlider)}>
          <span>Choose field size: {userFieldSize || defaultFieldSize}x{userFieldSize || defaultFieldSize}</span>
          <div className={cx(styles.input, styles.inputSlider)}>
            <Slider
              onDragStart={handleToggleGameDisabled}
              onDragStop={handleToggleGameDisabled}
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
        <h2 className={styles.header}>
          <span>Enable multiplayer:</span>
          <div className={styles.input}>
            <Toggle
              onToggle={handleEnableMultiplayer}
              defaultToggled={twoPlayerMode}
              />
          </div>
        </h2>
      </li>
      { !!twoPlayerMode && !!uniqLink && <li className={styles.item}>
        <h2 className={styles.header}>
          <span>Send your friend link to connect the game:</span>
          <span className={styles.link}>{uniqLink}</span>
        </h2>
      </li> }
      <li className={styles.item}>
        <div className={styles.input}>
            <Button
              label="Start Game"
              onClick={handleStartGame}
              disabled={gameStart || gameDisabled || showRefresh}
              primary
              />
            <Button
              label="Restart Game"
              onClick={handleRestartGame}
              disabled={!gameStart}
              secondary
              />
            <span className={styles.saveButton}>
              <Button
                disabled={gameFinish || showRefresh}
                label={savedGame ? "Continue Game" : "Save Game"}
                onClick={savedGame ? handleRestoreGame : handleSaveGame}
                />
            </span>
          </div>
        </li>
    </ul>
  );
}
