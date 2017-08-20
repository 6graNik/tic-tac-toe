import React from 'react';
import Toggle from 'material-ui/Toggle';
import cx from 'classnames';

import {
  VALUE_NOUGHT,
  VALUE_CROSS,
} from '../../constants/main.js';

import styles from './styles.css';

export default function Settings(props) {
  const {
    cells,
    handleCellClick,
  } = props;

  return (
    <section className={styles.field}>
      {cells.map(({value}, index) => {
        const className = cx(styles.cell, {
          [styles.empty]: !value,
          [styles.nought]: value === VALUE_NOUGHT,
          [styles.cross]: value === VALUE_CROSS,
        });

        const handleClick = () => handleCellClick(index);

        return <div
          onClick={handleClick}
          className={className}
          key={index}
          />
      })}
    </section>
  );
}
