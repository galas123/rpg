import {zeroDungeonObjects} from '../constants';
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


import {Map}  from 'immutable';

const defaultState = Map({
  fog:false,
  isWinner:false,
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
  const {type} = action;
  let locationX         = state.getIn(['hero', 'locationX']);
  let locationY         = state.getIn(['hero', 'locationY']);
  let itemInNewPosition;
  switch (type) {

    case TOGGLE_FOG:
      return state.set('fog', !state.get('fog'));
    
    case SET_RANDOM_ITEMS:
      let newState = placeItem(zeroDungeonObjects.hero, HERO, state);
      newState     = placeItem(zeroDungeonObjects.drug, DRUG, newState);
      newState     = placeItem(zeroDungeonObjects.weapon, WEAPON, newState);
      newState     = placeEnemies(enemySetForDungeon[0], newState);
      newState     = placeItem(zeroDungeonObjects.dungeon, DUNGEON, newState);
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
    }
  } 
  return state.set('dungeon', dungeonList).set('hero', heroInfo);
};

const placeEnemies=(quantityArray, state)=>{
  let dungeonList = state.get('dungeon');
  quantityArray.forEach((quantity, enemyLvl)=>{
  for (let n = 0; n < quantity; n++) {
    let {i, j}= getRandomCell(dungeonList);

    dungeonList = dungeonList.setIn([i, j], Object.assign({}, ENEMIES[enemyLvl]));
  }
});
  return state.set('dungeon', dungeonList);
};

const connectWithItem=(itemName, x1,y1,x0,y0,state)=>{
  let newState=state;
  let currentAttack=state.getIn(['hero', 'attack']);
  let heroHealth=state.getIn(['hero','heart']);

  if (itemName.name ==='ENEMY'||itemName.name ==='BOSS'){
    let enemyHealth=itemName.health-currentAttack;
    let enemyAttack=(itemName.level+1)*5;
    let newHeroHealth=heroHealth-enemyAttack;
    if (newHeroHealth<=0){
      return newState.setIn(['hero', 'heart'],0);
    }
    console.log('enemy', 'newHeroHealth',newHeroHealth,'enemyAttack',enemyAttack);
    if (enemyHealth <=0){
      if (itemName.name ==='BOSS'){
       return  newState.set('isWinner', true);
      }
      let XPtoNextLevel=newState.getIn(['hero', 'nextLevel']);
      let heroLevel=newState.getIn(['hero', 'level']);
      let xpForDeadEnemy=mapDungeonToGettingXP[heroLevel];
      console.log('enemyHealth <=0', 'XPtoNextLevel',XPtoNextLevel,'xpForDeadEnemy',xpForDeadEnemy,'enemyAttack',enemyAttack);
      if (XPtoNextLevel-xpForDeadEnemy<=0){
        newState=newState
          .setIn (['hero', 'level'], heroLevel+1)
          .setIn (['hero', 'nextLevel'], XPtoGetNextLevel[heroLevel+1])
          .setIn (['hero', 'attack'], currentAttack+addToAttackAfterLevelUp[heroLevel+1]);
      }
      else{
        newState=newState.setIn (['hero', 'nextLevel'], XPtoNextLevel-xpForDeadEnemy);
      }
      newState=newState
        .setIn(['dungeon', x1, y1], HERO)
        .setIn(['dungeon', x0, y0], 0)
        .setIn(['hero', 'locationX'], x1)
        .setIn(['hero', 'locationY'], y1)
    } else {
      newState = newState.setIn(['dungeon', x1, y1], {... itemName, health: enemyHealth});
    }
    console.log('hero',state.get('hero'),'itemName',newState.getIn(['dungeon', x1, y1]));
    return newState.setIn(['hero', 'heart'],newHeroHealth);
  }

  if (itemName !==WALL && itemName !==DUNGEON ) {

    if (itemName === DRUG){
      let new_heart_rate=state.getIn(['hero','heart'])+HEART_INCREASE;
      newState=state.setIn(['hero','heart'],new_heart_rate);
    }

    if (itemName === WEAPON){
      let currentWeapon=state.getIn(['hero', 'weapon']);
      let currentWeaponIndex=WEAPONS.indexOf(currentWeapon);
      let nextWeapon=WEAPONS[currentWeaponIndex + 1];
      if (currentWeaponIndex < 5) {
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
    if (newDungeonNumber <5) {
      newState = state.set('dungeonNumber', newDungeonNumber)
        .set('dungeon', DUNGEONS[newDungeonNumber])
        .setIn(['hero', 'locationX'],null)
        .setIn(['hero', 'locationY'],null);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].hero, HERO, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].drug, DRUG, newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].weapon, WEAPON, newState);
      newState =  placeEnemies(enemySetForDungeon[newDungeonNumber], newState);
      newState = placeItem(DUNGEON_OBJECTS[newDungeonNumber].dungeon, DUNGEON, newState);
      console.log('newDungeonNumber',newDungeonNumber);

    }
    return newState;
  }


  return newState;
}