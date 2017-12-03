import {WALL, DRUG, WEAPON, DUNGEON, HERO, ENEMY, BOSS} from '../constants';
import React, {
  Component
} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';

import classNames from 'classnames';

class Cell extends Component {
  render() {
    const {value, lastMoveOnTheLeft, rowIndex, lineIndex, coordinateHeroX, coordinateHeroY, fog}=this.props;

    let cellContent;
    let btnClass;
    let deltaY=Math.abs(rowIndex - coordinateHeroY);
    let deltaX=Math.abs(lineIndex - coordinateHeroX)

    if (((deltaY > 2 || deltaX>2) || (deltaX==2 && deltaY==2))  && fog) {
      btnClass = classNames({
        'cell'      : true,
        'in-fog': true,
      });
      cellContent=null;
    }
    else {
      btnClass = classNames({
        'cell'      : true,
        'cell--wall': value === WALL,
      });
      if (value instanceof Object) {
        if (value.name === ENEMY) {
          cellContent = (<Icon className="android-icon" name="android"/>);
        }
        if (value.name === BOSS) {
          console.log('BOSS');
          cellContent = (<Icon className="android-github-alt" name="github-alt"/>);
        }
      } else {
        switch (value) {
          case  DRUG:
            cellContent = (<Icon className="heart-icon" name="heart"/>);
            break;
          case WEAPON:
            cellContent = (<Icon className="gavel-icon" name="gavel"/>);
            break;
          case DUNGEON:
            cellContent = (<Icon className="sign-in-icon" name="sign-in"/>);
            break;
          case HERO:
            cellContent = (<Icon className="blind-icon" name="blind" flip={lastMoveOnTheLeft}/>);
            break;
        }
      }
    }
      return (
        <div className={btnClass}>
          {cellContent}
        </div>
      );

  }
}

const mapStateToProps = state=> {
  return {
    lastMoveOnTheLeft: state.dungeon.getIn(['hero','lastMoveOnTheLeft']),
    coordinateHeroX: state.dungeon.getIn(['heroLocation','x']),
    coordinateHeroY: state.dungeon.getIn(['heroLocation','y']),
    fog: state.dungeon.get('fog'),
  };
}

export default connect(mapStateToProps, null)(Cell);