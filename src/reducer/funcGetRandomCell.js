import {
  BOARD_SIZE
} from '../constants';

export const getRandomCell = (dungeonBoard) => {
  let i          = Math.floor(Math.random() * BOARD_SIZE.height);
  let j          = Math.floor(Math.random() * BOARD_SIZE.width);
  let randomLine = dungeonBoard.get(i);
  if (randomLine.get(j) !== 0) {
    j = randomLine.indexOf(0);
    if (j === -1) {
      return getRandomCell(dungeonBoard);
    }
  }
  return {i, j}
};