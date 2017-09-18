import React, {
  Component
} from 'react';
import Cell from './cell';

export default class Line extends Component {
  render() {
    const {dungeonLine, lineIndex}=this.props;
    const line=dungeonLine.map((cell,index)=>
      <Cell value={cell} key={index} rowIndex={index} lineIndex={lineIndex}/>
    );
    return (
      <div className="board-line">
        {line}
      </div>
    );
  }
}
