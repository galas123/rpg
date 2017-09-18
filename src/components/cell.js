import {WALL, DRUG, WEAPON, DUNGEON, ENEMY, HERO, BOSS} from '../constants';
import React, {
  Component
} from 'react';
import {Icon} from 'react-fa';

import classNames from 'classnames';

export default class Cell extends Component {
  render() {
    const {value}=this.props;
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
        cellContent = (<Icon className="blind-icon" name="blind"/>);
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
