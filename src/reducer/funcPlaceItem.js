import {
  HERO
} from '../constants';
import {getRandomCell} from './funcGetRandomCell';

export const placeItem = (quantity, itemName, state) => {
  let dungeonList = state.get('dungeon');
  let heroInfo    = state.get('hero');
  for (let n = 0; n < quantity; n++) {
    let {i, j}= getRandomCell(dungeonList);
    dungeonList = dungeonList.setIn([i, j], itemName);
    if (itemName === HERO) {
      heroInfo = heroInfo.set('locationX', i).set('locationY', j);
    }
  }
  return state.set('dungeon', dungeonList).set('hero', heroInfo);
};