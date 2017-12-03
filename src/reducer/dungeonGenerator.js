import {
    HERO,
    ENEMIES
} from '../constants';

import {getRandomCell} from './funcGetRandomCell';

export class DungeonGenerator {
    constructor(newState) {
        this.newState = newState;
        this.dungeonList = newState.get('dungeon');
        this.heroLocation = newState.get('heroLocation');
    }

    placeItem = (quantity, itemName) => {
        for (let n = 0; n < quantity; n++) {
            let {i, j} = getRandomCell(this.dungeonList);
            this.dungeonList = this.dungeonList.setIn([i, j], itemName);
            if (itemName === HERO) {
                this.heroLocation = this.heroLocation.set('x', i).set('y', j);
            }
        }
        this.newState=this.newState.set('dungeon', this.dungeonList).set('heroLocation', this.heroLocation);
        return this;
    };

    placeEnemies=(quantityArray)=>{
        let dungeonList = this.newState.get('dungeon');
        quantityArray.forEach((quantity, enemyLvl)=>{
            for (let n = 0; n < quantity; n++) {
                let {i, j}= getRandomCell(dungeonList);

                this.dungeonList = this.dungeonList.setIn([i, j], Object.assign({}, ENEMIES[enemyLvl]));
            }
        });
        this.newState=this.newState.set('dungeon', this.dungeonList);
        return this;
    };
}