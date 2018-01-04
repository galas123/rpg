import React, {
    Component
} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';

import classNames from 'classnames';

import {WALL, DRUG, WEAPON, DUNGEON, HERO, ENEMY, BOSS} from '../constants';

import {fogSelector, heroCoordinateX, heroCoordinateY, lastMoveOnTheLeftSelector} from '../selectors/selectors';


class Cell extends Component {

    render() {

        if (this.isFogging()) {
            return (
                <div className="cell in-fog"/>
            );
        }

        let cellContent;
        const {value} = this.props;
        const btnClass = classNames({
            'cell': true,
            'cell--wall': value === WALL,
        });

        if (value !== 0 && value !== WALL) {
            cellContent = this.getIcon(value);
        }

        return (
            <div className={btnClass}>
                {cellContent}
            </div>
        );
    }

    getIcon = (value) => {
        const {className, name, flip} = this.getIconParams(value);
        return (<Icon className={className} name={name} flip={flip}/>);
    };

    getIconParams = (value) => {
        const {lastMoveOnTheLeft} = this.props;
        if (value instanceof Object) {
            switch (value.name) {
                case ENEMY:
                    return {
                        className: "android-icon",
                        name: "android",
                        flip: null
                    } ;
                case BOSS:
                    return {
                        className: "android-github-alt",
                        name: "github-alt",
                        flip: null
                    }
            }
        }
            switch (value) {
                case  DRUG:
                    return {
                        className: "heart-icon",
                        name: "heart",
                        flip: null
                    };

                case WEAPON:
                    return {
                        className: "gavel-icon",
                        name: "gavel",
                        flip: null
                    };

                case DUNGEON:
                    return {
                        className: "sign-in-icon",
                        name: "sign-in",
                        flip: null
                    };

                case HERO:
                    return {
                        className: "blind-icon",
                        name: "blind",
                        flip: lastMoveOnTheLeft
                    };
                default:
                    break;
            }
    };

    isFogging = () => {
        const {rowIndex, lineIndex, coordinateHeroX, coordinateHeroY, fog} = this.props;
        let deltaY = Math.abs(rowIndex - coordinateHeroY);
        let deltaX = Math.abs(lineIndex - coordinateHeroX);
        return (fog && (deltaY > 2 || deltaX > 2 || (deltaX === 2 && deltaY === 2)));
    }
}


const mapStateToProps = state => {
        return {
            lastMoveOnTheLeft: lastMoveOnTheLeftSelector(state.dungeon),
            coordinateHeroX: heroCoordinateX(state.dungeon),
            coordinateHeroY: heroCoordinateY(state.dungeon),
            fog: fogSelector(state.dungeon)
        };
    };


export default connect(mapStateToProps, null)(Cell);