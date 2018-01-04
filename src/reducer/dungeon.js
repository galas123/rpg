import {DUNGEONS} from '../data/emptyDungeons';
import {
    zeroDungeonObjects,
    SET_RANDOM_ITEMS,
    RESET,
    HERO,
    DRUG,
    DUNGEON,
    WEAPON,
    STICK,
    enemySetForDungeon,
    TOGGLE_FOG,
    LEVEL_UP,
    XP_INCREASE,
    WIN,
    HERO_STEP,
    ENEMY_CHANGE,
    HERO_HEALTH_CHANGE,
    NEW_WEAPON,
    NEXT_DUNGEON,
    DUNGEON_OBJECTS,
    CHANGE_DIRECTION
} from '../constants';

import {fogSelector} from '../selectors/selectors';

import {DungeonGenerator} from './dungeonGenerator';


import {Map} from 'immutable';
import {HERO_DEAD} from "../constants/actionTypes";

const defaultState = Map({
    fog: false,
    isWinner: false,
    dungeon: DUNGEONS[0],
    dungeonNumber: 0,
    heroLocation: Map({
        x: null,
        y: null
    }),
    hero: Map({
        attack: 7,
        weapon: STICK,
        heart: 100,
        level: 0,
        nextLevel: 60,
        lastMoveOnTheLeft: null
    })
});

export default (state = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {

        case RESET:
            return defaultState;

        case CHANGE_DIRECTION:
            return state.setIn(['hero', 'lastMoveOnTheLeft'], payload.direction);
            break;

        case TOGGLE_FOG:
            const isFogOn = !fogSelector(state);
            return state.set('fog', isFogOn);

        case SET_RANDOM_ITEMS:
            return setRandomItems(state);

        case HERO_STEP:
            return makeStep(state,payload.x1, payload.y1, payload.x0, payload.y0);

        case WIN:
            return state.set('isWinner', true);

        case HERO_DEAD:
            return state.setIn(['hero', 'heart'], 0);

        case LEVEL_UP:
            return state
                .setIn(['hero', 'level'], payload.newLevel)
                .setIn(['hero', 'nextLevel'], payload.newXP)
                .setIn(['hero', 'attack'], payload.newAttack);

        case XP_INCREASE:
            return state.setIn(['hero', 'nextLevel'], payload.newXP);

        case ENEMY_CHANGE:
            return state.setIn(['dungeon', payload.x1, payload.y1],
                {...payload.itemInNewPosition, health: payload.enemyHealth});

        case HERO_HEALTH_CHANGE:
            return state.setIn(['hero', 'heart'], payload.newHeroHealth);

        case NEW_WEAPON:
            return state.setIn(['hero', 'weapon'], payload.nextWeapon)
                .setIn(['hero', 'attack'], payload.newAttack);

        case NEXT_DUNGEON: {
            const newDungeonNumber = payload.newDungeonNumber;
            const newState = state.set('dungeonNumber', newDungeonNumber)
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
    return state;
}
 const setRandomItems = (state) => {
    const dungeonGenerator = new DungeonGenerator(state);
    dungeonGenerator.placeItem(zeroDungeonObjects.hero, HERO)
        .placeItem(zeroDungeonObjects.drug, DRUG)
        .placeItem(zeroDungeonObjects.weapon, WEAPON)
        .placeEnemies(enemySetForDungeon[0])
        .placeItem(zeroDungeonObjects.dungeon, DUNGEON);
    return dungeonGenerator.newState;
 }

const makeStep = (state, x1, y1, x0, y0) => {
    return state
                .setIn(['dungeon', x1, y1], HERO)
                .setIn(['dungeon', x0, y0], 0)
                .setIn(['heroLocation', 'x'], x1)
                .setIn(['heroLocation', 'y'], y1);
}
