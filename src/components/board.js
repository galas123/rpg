import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import Line from './line';
import {moveUpHero} from '../AC/moveUpHero';
import {moveDownHero} from '../AC/moveDownHero';
import {moveLeftHero} from '../AC/moveLeftHero';
import {moveRightHero} from '../AC/moveRightHero';

class Board extends Component {
  render() {
    const {dungeon}=this.props;
    const board = dungeon.map((line, index)=>
      <Line dungeonLine={line} key={index} lineIndex={index}/>
    );
    return (
      <div className="game-board">
        {board}
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown = (ev)=> {
    const {moveUpHero, moveDownHero, moveLeftHero, moveRightHero, heart}=this.props;
    if (heart>0){
    switch (ev.keyCode) {
      case 38:
        moveUpHero();
        break;
      case 40:
        moveDownHero();
        break;
      case 37:
        moveLeftHero();
        break;
      case 39:
        moveRightHero();
        break;
    }
    }
  }
}

const mapStateToProps = state=> {
  return {
    dungeon: state.dungeon.get('dungeon'),
    heart: state.dungeon.getIn(['hero','heart']),
  };
}

export default connect(mapStateToProps, {moveUpHero, moveDownHero, moveLeftHero, moveRightHero})(Board);