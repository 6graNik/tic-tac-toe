# tic-tac-toe
Noughts and Crosses game App

You can change filed-size from 3 to 7 cells in a row, but computer plays best at classical 3x3 field.

Demo: https://6granik.github.io/tic-tac-toe/

You can run: npm i & npm run dev
And replace script in html template to <script src="http://localhost:{webpackport(default to 8888)}/bundle.js"></script>
To play it around in dev mode.

For production build: npm i & npm run build 

# Features TODO
Memoizations - functions getCells and getWinningAxels implemeting neested for cicles, which freeze browsers activity.

PropTypes - add type checking for React Component props.

Multiplayer - add Firebase based multiplayer mode this separate "rooms".
