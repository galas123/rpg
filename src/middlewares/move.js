import {
    MOVE_UP_HERO,
    MOVE_DOWN_HERO,
    MOVE_LEFT_HERO,
    MOVE_RIGHT_HERO,
    ENEMY_CHANGE,
    mapDungeonToGettingXP,
    XPtoGetNextLevel,
    addToAttackAfterLevelUp,
    WALL,
    DUNGEON,
    DRUG,
    BOSS,
    ENEMY,
    HEART_INCREASE, WEAPON,
    WEAPONS,
    HERO_DEAD,
    WIN,
    LEVEL_UP,
    XP_INCREASE,
    HERO_HEALTH_CHANGE,
    HERO_STEP,
    NEW_WEAPON,
    NEXT_DUNGEON,
    CHANGE_DIRECTION
} from '../constants'

import {isLooserSelector, isWinnerSelector, heroCoordinateX, heroCoordinateY, dungeonSelector,
    attackSelector, dungeonNumberSelector, heartSelector, levelSelector,
    nextLevelSelector, weaponSelector
} from '../selectors/selectors';

export default store => next => action => {
    const {type} = action;
    if (![MOVE_DOWN_HERO, MOVE_LEFT_HERO, MOVE_RIGHT_HERO, MOVE_UP_HERO].includes(type)) {
        next(action);
        return;
    }

    const state = store.getState().dungeon;
    if (isLooserSelector(state) || isWinnerSelector(state)) {
        return;
    }

    let locationX = heroCoordinateX(state);
    let locationY = heroCoordinateY(state);
    let x0, y0;
    let x1 = x0 = locationX;
    let y1 = y0 = locationY;

    switch (type) {
        case MOVE_UP_HERO:
            x1 = locationX - 1;
            break;
        case MOVE_DOWN_HERO:
            x1 = locationX + 1;
            break;
        case MOVE_LEFT_HERO:
            y1 = locationY - 1;
            next({
                type: CHANGE_DIRECTION,
                payload: {
                    direction: 'horizontal'
                }
            });
            break;
        case
        MOVE_RIGHT_HERO:
            y1 = locationY + 1;
            next({
                type: CHANGE_DIRECTION,
                payload: {
                    direction: null
                }
            });
            break;
            default: 
            return;
    }


    let itemInNewPosition = getNextValue(state, x1, y1);

    console.log('itemInNewPosition', itemInNewPosition);
    if (itemInNewPosition === 0){
        makeStep(x0,y0,x1,y1,next);
        return;
    };
    if (itemInNewPosition === WALL){
        next(action)
    };

    let currentAttack = attackSelector(state);
    let heroHealth = heartSelector(state);

    if (typeof itemInNewPosition === 'object') {
        const {name, level, health}=itemInNewPosition;
        const enemyLevel=level;

        const enemyHealth = health - currentAttack;
        let enemyAttack = (enemyLevel + 1) * 5;
            let newHeroHealth = heroHealth - enemyAttack;
            if (newHeroHealth <= 0) {
                next({
                    type: HERO_DEAD,
                });
                return;
            }
            next({
                type: HERO_HEALTH_CHANGE,
                payload: {
                    newHeroHealth
                }
            });

            if (enemyHealth <= 0) {
                if (name === BOSS) {
                    next({
                        type: WIN,
                    });
                    return;
                }

                let XPtoNextLevel = nextLevelSelector(state);
                let heroLevel = levelSelector(state);
                let xpForDeadEnemy = mapDungeonToGettingXP[enemyLevel];
                if (XPtoNextLevel - xpForDeadEnemy <= 0) {
                    next({
                        type: LEVEL_UP,
                        payload: {
                            newLevel: heroLevel + 1,
                            newXP: XPtoGetNextLevel[heroLevel + 1],
                            newAttack: currentAttack + addToAttackAfterLevelUp[heroLevel + 1]
                        }
                    });
                }
                else {
                    next({
                        type: XP_INCREASE,
                        payload: {
                            newXP: XPtoNextLevel - xpForDeadEnemy,
                        }
                    })
                }
                makeStep(x0,y0,x1,y1,next);
            }
            else {
                next({
                    type: ENEMY_CHANGE,
                    payload: {
                        x1,
                        y1,
                        itemInNewPosition,
                        enemyHealth
                    }
                    })
                }
            return;
    }


    switch (itemInNewPosition) {
        case DRUG:
            let newHeroHealth = heartSelector(state) + HEART_INCREASE;
            next({
                type: HERO_HEALTH_CHANGE,
                payload: {
                    newHeroHealth
                }
            });
            makeStep(x0,y0,x1,y1, next);
            break;

        case WEAPON:
            let currentWeapon = weaponSelector(state);
            let currentWeaponIndex = WEAPONS.indexOf(currentWeapon);
            let nextWeapon = WEAPONS[currentWeaponIndex + 1];
            if (currentWeaponIndex < 5) {
                next({
                    type: NEW_WEAPON,
                    payload: {
                        nextWeapon,
                        newAttack: currentAttack + nextWeapon.addAttack
                    }
                });
            }
            makeStep(x0,y0,x1,y1,next);
            break;

        case DUNGEON:
            let newDungeonNumber = dungeonNumberSelector(state) + 1;
            if (newDungeonNumber < 5) {
                next({
                    type: NEXT_DUNGEON,
                    payload: {
                        newDungeonNumber
                    }
                });
            }
            break;
            default:
            return;
};
next(action);
}

const getNextValue=(state, i,j)=>{
    return dungeonSelector(state).getIn([i, j]);
} ;

const makeStep = (x0,y0,x1,y1,next) =>{
    next({
        type: HERO_STEP,
        payload: {
            x1,
            y1,
            x0,
            y0
        }
    });
}


