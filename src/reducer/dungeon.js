import {dungeon0, DUNGEONS} from '../exampleBoard';
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
  BOSS,
  HEART_INCREASE,
  WEAPONS,
  STICK,
  WALL,
  DUNGEON_OBJECTS
} from '../constants';


import {Map}  from 'immutable';

const defaultState = Map({
  dungeon: dungeon0,
  dungeonNumber:0,
  hero   : Map({
    locationX: null,
    locationY: null,
    attack:7,
    weapon   : STICK,
    heart    : 100,
    level:0,
    nextLevel    : 60,
    lastMoveOnTheLeft : null
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
      return connectWithItem(itemInNewPosition, locationX - 1, locationY, locationX, locationY, state );

    case MOVE_DOWN_HERO:
    itemInNewPosition = state.getIn(['dungeon', locationX + 1, locationY]);
      return connectWithItem(itemInNewPosition, locationX + 1, locationY, locationX, locationY, state );

    case MOVE_LEFT_HERO:
      itemInNewPosition = state.getIn(['dungeon', locationX, locationY-1]);
      return connectWithItem(itemInNewPosition, locationX, locationY-1, locationX, locationY, state )
        .setIn(['hero','lastMoveOnTheLeft'],'horizontal');


    case MOVE_RIGHT_HERO:
      itemInNewPosition = state.getIn(['dungeon', locationX, locationY+1]);
      return connectWithItem(itemInNewPosition, locationX, locationY+1, locationX, locationY, state )
          .setIn(['hero','lastMoveOnTheLeft'],null);
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
};

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
};

const connectWithItem=(itemName, x1,y1,x0,y0,state)=>{
  let newState=state;
  let currentAttack=state.getIn(['hero', 'attack']);
  if (itemName !==WALL && itemName !==ENEMY && itemName !==DUNGEON ) {

    if (itemName === DRUG){
      let new_heart_rate=state.getIn(['hero','heart'])+HEART_INCREASE;
      newState=state.setIn(['hero','heart'],new_heart_rate);
    }

    if (itemName === WEAPON){
      let currentWeapon=state.getIn(['hero', 'weapon']);
      let currentWeaponIndex=WEAPONS.indexOf(currentWeapon);
      let nextWeapon=WEAPONS[currentWeaponIndex + 1];
      if (currentWeaponIndex < 6) {
        newState = state.setIn(['hero', 'weapon'], nextWeapon).setIn(['hero', 'attack'],currentAttack+nextWeapon.addAttack);
      }
    }

    return newState.setIn(['dungeon', x1, y1], HERO)
      .setIn(['dungeon', x0, y0], 0)
      .setIn(['hero', 'locationX'], x1)
      .setIn(['hero', 'locationY'], y1);
  }

  if (itemName === DUNGEON){
    let newDungeonNumber=state.get('dungeonNumber')+1;
    console.log('newDungeonNumber',newDungeonNumber);
    if (newDungeonNumber < 4) {
      console.log({DUNGEONS},'DUNGEONS[newDungeonNumber]',DUNGEONS[newDungeonNumber]);
      newState = state.set('dungeonNumber', newDungeonNumber)
        .set('dungeon', DUNGEONS[newDungeonNumber])
        .setIn(['hero', 'locationX'],null)
        .setIn(['hero', 'locationY'],null);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].hero, HERO, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].drug, DRUG, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].weapon, WEAPON, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].enemy, ENEMY, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].dungeon, DUNGEON, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].boss, BOSS, newState);
    }
    return newState;
  }

  return newState;
}