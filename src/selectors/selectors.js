import {createSelector} from 'reselect';

export const isWinnerSelector = state => state.get('isWinner');
export const heartSelector = state =>{console.log({state}); return state.getIn(['hero','heart']);}
export const  attackSelector = state => state.getIn(['hero','attack']);
export const weaponSelector = state => state.getIn(['hero','weapon']);
export const  levelSelector = state => state.getIn(['hero','level']);
export const nextLevelSelector  = state => state.getIn(['hero','nextLevel']);
export const  dungeonNumberSelector = state => state.get('dungeonNumber');
export const  dungeonSelector = state => state.get('dungeon');
export const  heroLocationSelector = state => state.get('heroLocation');
export const  lastMoveOnTheLeftSelector = state =>state.getIn(['hero','lastMoveOnTheLeft']);
export const  fogSelector = state =>state.get('fog');


export const isLooserSelector = createSelector(
  heartSelector,
  health => health<=0
)