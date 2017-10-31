import {} from './constants';
import React, {Component} from 'react';
import './App.css';
import Board from './components/board';
import FogOfWar from './components/fogOfWar'
import {setRandomItems} from './AC/setRandomItems'
import {connect} from 'react-redux';

import classNames from 'classnames';

class Container extends Component {

  componentWillMount(){
    const {setRandomItems}=this.props;
    setRandomItems();
  }

  render() {
    const {heart, weapon, attack, level, nextLevel,dungeonNumber,isWinner}=this.props;
    const rpgClass = classNames({
      'rpg'   : true,
      'rpg-stop-game':heart <=0||isWinner,
      'rpg-looser'  : heart <=0,
      'rpg-winner'  : isWinner,

    });
    return (
      <div className={rpgClass}>
        <h1 className="rpg_caption">Hero of Dungeon</h1>
        <h2 className="rpg_goal-name">Kill the boss in dungeon 4</h2>
        <div className="wrapper">
          
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
          
          <div>
            <Board classname={"game-board"}/>
          </div>
          <div className="toggle-fog">
            <FogOfWar/>
            </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state=> {
  return {
    heart: state.dungeon.getIn(['hero','heart']),
    attack:state.dungeon.getIn(['hero','attack']),
    weapon   : state.dungeon.getIn(['hero','weapon']),
    level: state.dungeon.getIn(['hero','level']),
    nextLevel    : state.dungeon.getIn(['hero','nextLevel']),
    dungeonNumber :state.dungeon.get('dungeonNumber'),
    isWinner:state.dungeon.get('isWinner')
  };
}

export default connect(mapStateToProps, {setRandomItems})(Container);