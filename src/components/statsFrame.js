import React, {Component} from 'react';

import HeroAttribute from './heroAttribute';

export default class statsFrame extends Component {
  render() {
    const {heart, weapon, attack, level, nextLevel, dungeonNumber}=this.props;
    return (
      <dl className="stats-frame">
          <HeroAttribute name="Health:" value={heart}/>
          <HeroAttribute name="Weapon:" value={weapon.name}/>
          <HeroAttribute name="Attack:" value={attack}/>
          <HeroAttribute name="Level:" value={level}/>
          <HeroAttribute name="Next Level:" value={nextLevel} />
          <HeroAttribute name="Dungeon:" value={dungeonNumber}/>
      </dl>
    )
  }
}
