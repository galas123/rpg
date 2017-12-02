import React, {Component} from 'react';

export default class statsFrame extends Component {
  render() {
    const {heart, weapon, attack, level, nextLevel, dungeonNumber}=this.props;
    return (
      <dl className="stats-frame">
        <div className="hero-skill">
          <dt className="hero-skill-caption">Health:</dt>
          <dd className="hero-skill-value">{heart}</dd>
        </div>
        <div className="hero-skill">
          <dt className="hero-skill-caption">Weapon:</dt>
          <dd className="hero-skill-value">{weapon.name}</dd>
        </div>
        <div className="hero-skill">
          <dt className="hero-skill-caption">Attack:</dt>
          <dd className="hero-skill-value">{attack}</dd>
        </div>
        <div className="hero-skill">
          <dt className="hero-skill-caption">Level:</dt>
          <dd className="hero-skill-value">{level}</dd>
        </div>
        <div className="hero-skill">
          <dt className="hero-skill-caption">Next Level:</dt>
          <dd className="hero-skill-value">{nextLevel}</dd><span>XP</span>
        </div>
        <div className="hero-skill">
          <dt className="hero-skill-caption">Dungeon:</dt>
          <dd className="hero-skill-value">{dungeonNumber}</dd>
        </div>
      </dl>
    )
  }
}
