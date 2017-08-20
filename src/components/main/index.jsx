import React from 'react';

import styles from './styles.css';

export default function App() {
  const time = Date.now();

  return (
    <div className={styles.root}>My App {time} qipqap</div>
  );
}
