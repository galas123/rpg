import {dungeon0, DUNGEONS} from '../emptyDungeons';
import {
  mapDungeonToGettingXP,
  XPtoGetNextLevel, 
  addToAttackAfterLevelUp, 
  HERO, 
  WALL, 
  DUNGEON, 
  DRUG, 
  HEART_INCREASE,WEAPON, 
  WEAPONS,DUNGEON_OBJECTS,
  enemySetForDungeon,
} from '../constants';

import {placeItem} from './funcPlaceItem';
import {placeEnemies} from './funcPlaceEnemies';

export const connectWithItem=(itemName, x1,y1,x0,y0,state)=>{
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
    if (enemyHealth <=0){
      if (itemName.name ==='BOSS'){
        return  newState.set('isWinner', true);
      }
      let XPtoNextLevel=newState.getIn(['hero', 'nextLevel']);
      let heroLevel=newState.getIn(['hero', 'level']);
      let xpForDeadEnemy=mapDungeonToGettingXP[heroLevel];
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