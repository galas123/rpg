import {
  ENEMIES
} from '../constants';
import {getRandomCell} from './funcGetRandomCell';

export const placeEnemies=(quantityArray, state)=>{
  let dungeonList = state.get('dungeon');
  quantityArray.forEach((quantity, enemyLvl)=>{
    for (let n = 0; n < quantity; n++) {
      let {i, j}= getRandomCell(dungeonList);

      dungeonList = dungeonList.setIn([i, j], Object.assign({}, ENEMIES[enemyLvl]));
    }
  });
  return state.set('dungeon', dungeonList);
};