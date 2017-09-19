import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import Line from './line';
import {moveUpHero} from '../AC/moveUpHero';

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
    const {moveUpHero}=this.props;
    console.log('move up press', ev.keyCode );
    if (ev.keyCode === 38) {
      console.log('move up press', ev);
      moveUpHero();
    }
  }
}

const mapStateToProps = state=> {
  return {
    dungeon: state.dungeon.get('dungeon'),
  };
}

export default connect(mapStateToProps, {moveUpHero})(Board);