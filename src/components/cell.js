import React, {
    Component
} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';

import classNames from 'classnames';

import {WALL, DRUG, WEAPON, DUNGEON, HERO, ENEMY, BOSS} from '../constants';

import {fogSelector, heroLocationSelector, lastMoveOnTheLeftSelector} from '../selectors/selectors';


class Cell extends Component {
    render() {
        const {value} = this.props;

        let cellContent;
        let btnClass;

        if (this.isFogging()) {
            btnClass = classNames({
                'cell': true,
                'in-fog': true,
            });
            cellContent = null;
        }
        else {
            btnClass = classNames({
                'cell': true,
                'cell--wall': value === WALL,
            });

            if (value!==0 && value!==WALL){
                const {className, name, flip} = this.getIconParams(value);
                console.log('flip',flip,'classname',className, 'name', name);
                cellContent = (<Icon className={className} name={name} flip={flip}/>);
            }



            return (
                <div className={btnClass}>
                    {cellContent}
                </div>
            );
        }
    }

         getIconParams = (value) => {
        const {lastMoveOnTheLeft}=this.props;
            if (value instanceof Object) {
                if (value.name === ENEMY) {
                    return {
                        className: "android-icon",
                        name: "android",
                        flip: null
                    }
                }
                if (value.name === BOSS) {
                    return {
                        className: "android-github-alt",
                        name: "github-alt",
                        flip: null
                    }
                }
            } else {
                switch (value) {
                    case  DRUG:
                        return {
                            className: "heart-icon",
                            name: "heart",
                            flip: null
                        }
                    case WEAPON:
                        return {
                            className: "gavel-icon",
                            name: "gavel",
                            flip: null
                        }
                    case DUNGEON:
                        return {
                            className: "sign-in-icon",
                            name: "sign-in",
                            flip: null
                        }
                    case HERO:
                        return {
                            className: "blind-icon",
                            name: "blind",
                            flip: lastMoveOnTheLeft
                        }
                    default:
                       break;
                }

            }
        }

        isFogging = () =>
        {
            const {rowIndex, lineIndex, coordinateHeroX, coordinateHeroY, fog} = this.props;
            let deltaY = Math.abs(rowIndex - coordinateHeroY);
            let deltaX = Math.abs(lineIndex - coordinateHeroX)
            return fog && ((deltaY > 2 || deltaX > 2) || (deltaX == 2 && deltaY == 2));
        }
    }


    const mapStateToProps = state => {
        return {
            lastMoveOnTheLeft: lastMoveOnTheLeftSelector(state.dungeon),
            coordinateHeroX: heroLocationSelector(state.dungeon).get('x'),
            coordinateHeroY: heroLocationSelector(state.dungeon).get('y'),
            fog: fogSelector(state.dungeon)
        };
    }


    export default connect(mapStateToProps, null)(Cell);