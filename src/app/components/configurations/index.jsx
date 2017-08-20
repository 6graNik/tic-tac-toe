import React from 'react';
import Toggle from 'material-ui/Toggle';

import styles from './styles.css';

export default function Configurations() {
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
    </ul>
  );
}
