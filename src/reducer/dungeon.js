import {
  SET_RANDOM_ITEMS,
  BOARD_SIZE,
  HERO,
  DRUG,
  DUNGEON,
  WEAPON,
  ENEMY,
  BOSS
} from '../constants';

import {exampleBoard} from '../exampleBoard';

import {Map, List}  from 'immutable';

const defaultState = Map({
  dungeon: exampleBoard,
});

export default (state = defaultState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_RANDOM_ITEMS:

      let newDungeon = placeItem(payload.items.hero, HERO, state.get('dungeon') );
      newDungeon = placeItem(payload.items.drug, DRUG, newDungeon );
      newDungeon = placeItem(payload.items.weapon,WEAPON, newDungeon);
      newDungeon = placeItem(payload.items.enemy, ENEMY, newDungeon);
      newDungeon = placeItem(payload.items.dungeon, DUNGEON, newDungeon);
      newDungeon = placeItem(payload.items.boss, BOSS, newDungeon);
      return state.set('dungeon',newDungeon);
  }
  return state;
}

const getRandomCell = (dungeonBoard) => {
  let i = Math.floor(Math.random() * BOARD_SIZE.height);
  let j = Math.floor(Math.random() * BOARD_SIZE.width);
  let randomLine = dungeonBoard.get(i);
  if (randomLine.get(j) !== 0) {
    j = randomLine.indexOf(0);
    if (j === -1) {
      return getRandomCell(dungeonBoard);
    }
  }
  return {i, j}
}

const placeItem = (quantity, itemName, dungeonList) =>{
  for (let n = 0; n < quantity; n++) {
    let {i, j}= getRandomCell(dungeonList);
    dungeonList = dungeonList.setIn([ i, j], itemName);
  }
  return dungeonList
}