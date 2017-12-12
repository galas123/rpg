import {
    BOARD_SIZE
} from '../constants';

export const getRandomCell = (dungeonBoard) => {
    let i = Math.floor(Math.random() * BOARD_SIZE.height);
    let j = Math.floor(Math.random() * BOARD_SIZE.width);
    let randomLine = dungeonBoard.get(i);
    if (randomLine.get(j) !== 0) {
        if (randomLine.indexOf(0) === -1) {
            return getRandomCell(dungeonBoard);
        }
        const cells = randomLine.toArray().map((item, index) => ({
            item, index
        })).filter(cell => cell.item === 0);
        j = cells[Math.floor(Math.random() * cells.length)].index;
    }
    return {i, j}
};