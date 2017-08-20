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
  } = props;

  return (
    <section className={styles.field}>
      {cells.map(({value}, index) => {
        const className = cx(styles.cell, {
          [styles.empty]: !value,
          [styles.nought]: value === VALUE_NOUGHT,
          [styles.cross]: value === VALUE_CROSS,
        });

        return <div className={className} key={index} />
      })}
    </section>
  );
}
