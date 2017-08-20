import React, {Component} from 'react';
import Button from 'material-ui/RaisedButton';

import Configurations from '../configurations';
import GameField from '../game-field';
import GameSettings from '../game-settings';

import {getCells} from '../../constants/main.js';

import styles from './styles.css';

const CELLS = getCells();

export default class NoughtsCrosses extends Component {
  render() {
    return (
      <section className={styles.root}>
        <main className={styles.inner}>
          <section className={styles.head}>
            <h1>Noughts and Crosses game App</h1>
          </section>
          <section className={styles.configurations}>
            <Configurations />
          </section>
          <section className={styles.gameContainer}>
            <GameField cells={CELLS} />
            <GameSettings />
          </section>
        </main>
      </section>
    );
  }
}
