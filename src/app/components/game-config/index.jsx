import React from 'react';
import cx from 'classnames';
import Toggle from 'material-ui/Toggle';
import Button from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import Input from 'material-ui/TextField';

import {
  ROLE_PLAYER_ONE,
  ROLE_PLAYER_TWO,
} from '../../constants/main.js';

import styles from './styles.css';

export default function GameConfig(props) {
  const {
    handleStartGame,
    handleRestartGame,
    handleResetGame,
    handleRestoreGame,
    handleSaveGame,
    defaultFieldSize,
    userFieldSize,
    handleChangeFieldSize,
    handleToggleGameDisabled,
    handleEnableMultiplayer,
    handleNameChange,
    gameStart,
    gameFinish,
    savedGame,
    gameDisabled,
    showRefresh,
    twoPlayerMode,
    uniqLink,
    currentPlayer,
    connected,
  } = props;

  const connectStatusClassName = cx(styles.connectStatus, {
    [styles.connectStatusInProgress]: twoPlayerMode && !connected,
    [styles.connectStatusOk]: twoPlayerMode && connected,
  });

  return (
    <ul className={styles.root}>
      {currentPlayer && <li className={styles.item}>
        <h2 className={styles.header}>
          <span>Enter your name:</span>
          <div className={cx(styles.input, styles.inputName)}>
            <Input defaultValue={currentPlayer.name} onChange={handleNameChange}/>
          </div>
        </h2>
      </li>}
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
          <span className={connectStatusClassName}></span>
        </h2>
      </li>
      { !!twoPlayerMode && !!uniqLink && <li className={styles.item}>
        <h2 className={styles.header}>
          <span>Send your friend link to connect the game:</span>
          <br />
          <span className={styles.link}>{uniqLink}</span>
        </h2>
      </li> }
      <li className={styles.item}>
        <div className={styles.input}>
            <Button
              label={gameStart ? 'Restart Game' : 'Start Game'}
              onClick={gameStart ? handleRestartGame : handleStartGame}
              disabled={gameDisabled || showRefresh}
              primary={!gameStart}
              secondary={gameStart}
              />
            <Button
              label="Reset Game"
              onClick={handleResetGame}
              disabled={!gameStart}
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
