import {
  SET_RANDOM_ITEMS,
  MOVE_UP_HERO,
  MOVE_DOWN_HERO,
  MOVE_LEFT_HERO,
  MOVE_RIGHT_HERO,
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
  hero   : Map({
    locationX: null,
    locationY: null,
    weapon   : 'stick',
    heart    : 100,
    XP       : 0,
    level    : 0
  })
});

export default (state = defaultState, action) => {
  const {type, payload} = action;
  let locationX         = state.getIn(['hero', 'locationX']);
  let locationY         = state.getIn(['hero', 'locationY']);
  let itemInNewPosition;
  switch (type) {
    case SET_RANDOM_ITEMS:
      let newState = placeItem(payload.items.hero, HERO, state);
      newState     = placeItem(payload.items.drug, DRUG, newState);
      newState     = placeItem(payload.items.weapon, WEAPON, newState);
      newState     = placeItem(payload.items.enemy, ENEMY, newState);
      newState     = placeItem(payload.items.dungeon, DUNGEON, newState);
      newState     = placeItem(payload.items.boss, BOSS, newState);
      return newState;

    case MOVE_UP_HERO:
      itemInNewPosition = state.getIn(['dungeon', locationX - 1, locationY]);
      if (itemInNewPosition === 0 | itemInNewPosition === DRUG | itemInNewPosition === WEAPON) {
        return state.setIn(['dungeon', locationX - 1, locationY], HERO)
          .setIn(['dungeon', locationX, locationY], 0)
          .setIn(['hero', 'locationX'], locationX - 1);
      }
      return state;

    case MOVE_DOWN_HERO:
    itemInNewPosition = state.getIn(['dungeon', locationX + 1, locationY]);
    if (itemInNewPosition === 0 | itemInNewPosition === DRUG | itemInNewPosition === WEAPON) {
      return state.setIn(['dungeon', locationX + 1, locationY], HERO)
        .setIn(['dungeon', locationX, locationY], 0)
        .setIn(['hero', 'locationX'], locationX + 1);
    }
      return state;

    case MOVE_LEFT_HERO:
      itemInNewPosition = state.getIn(['dungeon', locationX, locationY-1]);
      if (itemInNewPosition === 0 | itemInNewPosition === DRUG | itemInNewPosition === WEAPON) {
        return state.setIn(['dungeon', locationX, locationY-1], HERO)
          .setIn(['dungeon', locationX, locationY], 0)
          .setIn(['hero', 'locationY'], locationY - 1);
      }
      return state;

    case MOVE_RIGHT_HERO:
      itemInNewPosition = state.getIn(['dungeon', locationX, locationY+1]);
      if (itemInNewPosition === 0 | itemInNewPosition === DRUG | itemInNewPosition === WEAPON) {
        return state.setIn(['dungeon', locationX, locationY+1], HERO)
          .setIn(['dungeon', locationX, locationY], 0)
          .setIn(['hero', 'locationY'], locationY + 1);
      }
      return state;
  }
  return state;
}

const getRandomCell = (dungeonBoard) => {
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
}

const placeItem = (quantity, itemName, state) => {
  let dungeonList = state.get('dungeon');
  let heroInfo    = state.get('hero');
  for (let n = 0; n < quantity; n++) {
    let {i, j}= getRandomCell(dungeonList);
    dungeonList = dungeonList.setIn([i, j], itemName);
    if (itemName === HERO) {
      heroInfo = heroInfo.set('locationX', i).set('locationY', j);
      console.log('heroInfo', heroInfo);
    }

  }
  return state.set('dungeon', dungeonList).set('hero', heroInfo);
  ;
}