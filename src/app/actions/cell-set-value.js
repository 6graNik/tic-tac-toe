export default function cellSetValue(context, index) {
  const {
    cells,
    activePlayer,
    moves,
  } = context.state;

  // change clicked cell value
  cells[index].value = context.state[activePlayer].value;

  context.handleSetState({
    cells: [
      ...cells,
    ],
    moves: moves + 1,
  });
}
