export const WALL             = "WALL";
export const WEAPON           = "WEAPON";
export const DUNGEON          = "DUNGEON";
export const DRUG             = "DRUG";
export const HERO             = "HERO";
export const ENEMY            = "ENEMY";
export const BOSS            = "BOSS";
export const SET_RANDOM_ITEMS = "SET_RANDOM_ITEMS";
export const BOARD_SIZE       = {
  width : 23,
  height: 12
};
export const MOVE_UP_HERO     = 'MOVE_UP_HERO';
export const MOVE_DOWN_HERO   = 'MOVE_DOWN_HERO';
export const MOVE_LEFT_HERO   = 'MOVE_LEFT_HERO';
export const MOVE_RIGHT_HERO  = 'MOVE_RIGHT_HERO';
export const HEART_INCREASE   = 20;
export const TOGGLE_FOG ='TOGGLE_FOG';
export const STICK            = {
  name  : 'stick',
  addAttack: 7
};
export const BRASS_KNUCKLES            = {
  name  : 'brass knuckles',
  addAttack:  7
};
export const SERRATED_DAGGER            = {
  name  : 'serrated dagger',
  addAttack:  12
};
export const KATANA            = {
  name  : 'katana',
  addAttack:  16
};
export const REAPERS_SCYTHE            = {
  name  : 'reaper \'s scythe',
  addAttack:  22
};
export const LARGE_TROUT            = {
  name  : 'large trout',
  addAttack:  30
};
export const zeroDungeonObjects={
  hero:1,
  drug:3,
  weapon:1,
  dungeon:1
};
export const firstDungeonObjects={
  hero:1,
  drug:3,
  weapon:1,
  dungeon:1
};
export const secondDungeonObjects={
  hero:1,
  drug:4,
  weapon:2,
  dungeon:1
};
export const thirdDungeonObjects={
  hero:1,
  drug:4,
  weapon:1,
  dungeon:1
};
export const forthDungeonObjects={
  hero:1,
  drug:5,
  weapon:1,
  dungeon:0
};
export const WEAPONS=[STICK,BRASS_KNUCKLES,SERRATED_DAGGER,KATANA,REAPERS_SCYTHE, LARGE_TROUT];
export const addToAttackAfterLevelUp=[0,12,24,36,48];
export const XPtoGetNextLevel=[60,120,180,240];
export const mapDungeonToGettingXP=[10,20,30,40,50];
export const DUNGEON_OBJECTS=[zeroDungeonObjects,firstDungeonObjects,secondDungeonObjects,thirdDungeonObjects,forthDungeonObjects];
export const ENEMIES=[
  {name:ENEMY,health:50,level:0},
  {name:ENEMY,health:50,level:1},
  {name:ENEMY,health:100,level:2},
  {name:ENEMY,health:200,level:3},
  {name:ENEMY,health:200,level:4},
  {name:BOSS, health:200,level:5}];
export const enemySetForDungeon=[[4,1,0,0,0],[2,3,1,0,0],[0,0,0,6,0],[0,0,0,3,3],[0,0,0,2,3,1]];




