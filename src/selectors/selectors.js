import {createSelector} from 'reselect';

export const isWinner = state => state.dungeon.get('isWinner');
export const heart = state => state.dungeon.getIn(['hero','heart']);
export const  attack = state => state.dungeon.getIn(['hero','attack']);
export const weapon = state => state.dungeon.getIn(['hero','weapon']);
export const  level = state => state.dungeon.getIn(['hero','level']);
export const nextLevel  = state => state.dungeon.getIn(['hero','nextLevel']);
export const  dungeonNumber = state => state.dungeon.get('dungeonNumber');

export const isLooser = createSelector(
  heart,
  health => health<=0
)