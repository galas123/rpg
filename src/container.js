import {} from './constants';
import React, {Component} from 'react';
import './App.css';
import Board from './components/board';
import {setRandomItems} from './AC/setRandomItems'
import {connect} from 'react-redux';

class Container extends Component {

  componentWillMount(){
    const {setRandomItems}=this.props;
    const zeroDungeon={
      hero:1,
      drug:3,
      weapon:2,
      enemy:5,
      dungeon:1,
      boss:1
    };
    setRandomItems(zeroDungeon);
  }

  render() {
    return (
      <div className="rpg">
        <h1 className="rpg_caption">Hero of Dungeon</h1>
        <h2 className="rpg_goal-name">Kill the boss in dungeon 4</h2>
        <div className="wrapper">
          
          <dl className="stats-frame">
              <dt>Health:</dt>
              <dd>10</dd>
            <dt>Weapon:</dt>
            <dd>Stick</dd>
            <dt>Level:</dt>
            <dd>2</dd>
            <dt>Next Level:</dt>
            <dd>60XP</dd>
            <dt>Dungeon:</dt>
            <dd>0</dd>
            
          </dl>
          
          <div>
            <Board classname={"game-board"}/>
          </div>
          <div className="toggle-fog">
          <button>Toggle Fog of War</button>
            </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {setRandomItems})(Container);