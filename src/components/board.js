import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import Line from './line';

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
}
const mapStateToProps = state=> {
  return {
    dungeon: state.dungeon.get('dungeon')
  };
}

export default connect(mapStateToProps, null)(Board);