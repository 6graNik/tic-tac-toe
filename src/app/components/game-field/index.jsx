import React from 'react';
import cx from 'classnames';
import Toggle from 'material-ui/Toggle';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {
  VALUE_NOUGHT,
  VALUE_CROSS,
} from '../../constants/main.js';

import styles from './styles.css';

export default function GameField(props) {
  const {
    cells,
    handleCellClick,
    fieldSize,
    showRefresh,
    gameStart,
    gameFinish,
    winner,
    warning,
  } = props;

  let y = 0;
  let bg = ['#f2f2f2', '#fff'];
  const evenSide = !(fieldSize % 2);
  const showOverlay = showRefresh || !gameStart || gameFinish;

  return (
    <section className={styles.fieldWrapper}>
      <section className={styles.field}>
        {cells.map(({value}, index) => {
          const className = cx(styles.cell, {
            [styles.empty]: !value,
            [styles.nought]: !showRefresh && value === VALUE_NOUGHT,
            [styles.cross]: !showRefresh && value === VALUE_CROSS,
          });

          const cellPart = 100 / fieldSize;

          if (evenSide && !(index % fieldSize)) {
            y++;
          }

          const customBg = !Boolean((index + y) % 2) ? bg[0] : bg[1];

          const cellStyle = {
            flex: `0 0 ${cellPart}%`,
            paddingBottom: `${cellPart}%`,
            background: customBg,
          };

          const handleClick = () => handleCellClick(index);

          return <div
            onClick={handleClick}
            className={className}
            style={cellStyle}
            key={index}
            />
        })}
      </section>
      {showRefresh && <div className={styles.refreshIndicator}>
        <RefreshIndicator status="loading" style={{position: 'static'}}/>
      </div>}
      {showOverlay && <div className={styles.overlay} />}
      {gameFinish && <div className={styles.winner}>
        {winner ? `Wins: ${winner}!` : 'Draw'}
      </div>}
      {warning && <div className={styles.warning}>{warning}</div>}
    </section>
  );
}
