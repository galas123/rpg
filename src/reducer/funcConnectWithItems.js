import {DUNGEONS} from '../emptyDungeons';
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
import { attackSelector, dungeonNumberSelector, heartSelector, levelSelector,
    nextLevelSelector, weaponSelector} from '../selectors/selectors';


import {DungeonGenerator} from './dungeonGenerator';

export const connectWithItem=(itemName, x1,y1,x0,y0,state)=>{
  let newState=state;
  let currentAttack=attackSelector(newState);
  let heroHealth=heartSelector(newState);

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
      let XPtoNextLevel=nextLevelSelector(newState);
      let heroLevel=levelSelector(newState);
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
        .setIn(['heroLocation', 'x'], x1)
        .setIn(['heroLocation', 'y'], y1)
    } else {
      newState = newState.setIn(['dungeon', x1, y1], {... itemName, health: enemyHealth});
    }
    return newState.setIn(['hero', 'heart'],newHeroHealth);
  }

  if (itemName !==WALL && itemName !==DUNGEON ) {

    if (itemName === DRUG){
      let new_heart_rate=heartSelector(newState)+HEART_INCREASE;
      newState=state.setIn(['hero','heart'],new_heart_rate);
    }

    if (itemName === WEAPON){
      let currentWeapon=weaponSelector(newState);
      let currentWeaponIndex=WEAPONS.indexOf(currentWeapon);
      let nextWeapon=WEAPONS[currentWeaponIndex + 1];
      if (currentWeaponIndex < 5) {
        newState = state.setIn(['hero', 'weapon'], nextWeapon).setIn(['hero', 'attack'],currentAttack+nextWeapon.addAttack);
      }
    }

    return newState.setIn(['dungeon', x1, y1], HERO)
      .setIn(['dungeon', x0, y0], 0)
      .setIn(['heroLocation', 'x'], x1)
      .setIn(['heroLocation', 'y'], y1);
  }

  if (itemName === DUNGEON){
    let newDungeonNumber=dungeonNumberSelector(newState)+1;
    if (newDungeonNumber <5) {
        newState = state.set('dungeonNumber', newDungeonNumber)
            .set('dungeon', DUNGEONS[newDungeonNumber])
            .setIn(['heroLocation', 'x'], null)
            .setIn(['heroLocation', 'y'], null);
        const dungeonGenerator = new DungeonGenerator(newState);
        dungeonGenerator.placeItem(DUNGEON_OBJECTS[newDungeonNumber].hero, HERO)
            .placeItem(DUNGEON_OBJECTS[newDungeonNumber].drug, DRUG)
            .placeItem(DUNGEON_OBJECTS[newDungeonNumber].weapon, WEAPON)
            .placeEnemies(enemySetForDungeon[newDungeonNumber])
            .placeItem(DUNGEON_OBJECTS[newDungeonNumber].dungeon, DUNGEON);

        return dungeonGenerator.newState;
    }
  }
  return newState;
}