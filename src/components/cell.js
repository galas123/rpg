import {WALL, DRUG, WEAPON, DUNGEON, ENEMY, HERO, BOSS} from '../constants';
import React, {
  Component
} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';

import classNames from 'classnames';

class Cell extends Component {
  render() {
    const {value, lastMoveOnTheLeft}=this.props;
    const btnClass = classNames({
      'cell'         : true,
      'cell--wall'   : value === WALL,
    });
    let cellContent;
    switch (value) {
      case  DRUG:
        cellContent = (<Icon className="heart-icon" name="heart"/>);
        break;
      case WEAPON:
        cellContent = (<Icon className="gavel-icon" name="gavel"/>);
        break;
      case DUNGEON:
        cellContent = (<Icon  className="sign-in-icon" name="sign-in"/>);
        break;
      case HERO:
        cellContent = (<Icon className="blind-icon" name="blind" flip={lastMoveOnTheLeft}/>);
        break;
      case ENEMY:
        cellContent = (<Icon className="android-icon" name="android"/>);
        break;
      case BOSS:
        cellContent = (<Icon className="android-github-alt" name="github-alt"/>);
        break
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
    lastMoveOnTheLeft: state.dungeon.getIn(['hero','lastMoveOnTheLeft'])
  };
}

export default connect(mapStateToProps, null)(Cell);