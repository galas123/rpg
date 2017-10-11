export const WALL             = "WALL";
export const WEAPON           = "WEAPON";
export const DUNGEON          = "DUNGEON";
export const DRUG             = "DRUG";
export const HERO             = "HERO";
export const ENEMY            = "ENEMY";
export const BOSS             = "BOSS";
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
  weapon:2,
  enemy:5,
  dungeon:1
};
export const firstDungeonObjects={
  hero:1,
  drug:3,
  weapon:3,
  enemy:3,
  dungeon:1
};
export const secondDungeonObjects={
  hero:1,
  drug:4,
  weapon:4,
  enemy:4,
  dungeon:1
};
export const thirdDungeonObjects={
  hero:1,
  drug:5,
  weapon:5,
  enemy:5,
  dungeon:0,
  boss:1
};
export const WEAPONS=[STICK,BRASS_KNUCKLES,SERRATED_DAGGER,KATANA,REAPERS_SCYTHE, LARGE_TROUT];
export const addToAttackAfterLevelUp=[0,12,24,36,48];
export const XPtoGetNextLevel=[60,120,180,240];
export const mapDungeonToGettingXP=[10,20,30,40,50];
export const DUNGEON_OBJECTS=[zeroDungeonObjects,firstDungeonObjects,secondDungeonObjects,thirdDungeonObjects];




