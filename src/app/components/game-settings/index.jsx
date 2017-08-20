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
    cells,
  } = props;

  return (
    <section className={styles.gameSettings}>
      Game settings
    </section>
  );
}
