import {dungeon0, DUNGEONS} from '../emptyDungeons';
import {
  zeroDungeonObjects,
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
  HEART_INCREASE,
  WEAPONS,
  STICK,
  WALL,
  DUNGEON_OBJECTS,
  enemySetForDungeon,
  ENEMIES,
  mapDungeonToGettingXP,
  XPtoGetNextLevel,
  addToAttackAfterLevelUp,
  TOGGLE_FOG
} from '../constants';

import {DungeonGenerator} from './dungeonGenerator';
import {connectWithItem} from './funcConnectWithItems';

import {Map}  from 'immutable';

const defaultState = Map({
  fog:false,
  isWinner:false,
  dungeon: DUNGEONS[0],
  dungeonNumber:0,
    heroLocation: Map({
        x:null,
        y:null
}),
  hero   : Map({
    attack:7,
    weapon   : STICK,
    heart    : 100,
    level:0,
    nextLevel    : 60,
    lastMoveOnTheLeft : null
  })
});

export default (state = defaultState, action) => {
  const {type} = action;
  let locationX         = state.getIn(['heroLocation', 'x']);
  let locationY         = state.getIn(['heroLocation', 'y']);
  let itemInNewPosition;

  switch (type) {
    case TOGGLE_FOG:
      return state.set('fog', !state.get('fog'));
    
      case SET_RANDOM_ITEMS:
        const dungeonGenerator = new DungeonGenerator(state);
       dungeonGenerator.placeItem(zeroDungeonObjects.hero, HERO)
          .placeItem(zeroDungeonObjects.drug, DRUG)
          .placeItem(zeroDungeonObjects.weapon, WEAPON)
          .placeEnemies(enemySetForDungeon[0])
          .placeItem(zeroDungeonObjects.dungeon, DUNGEON);
       return dungeonGenerator.newState;


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


