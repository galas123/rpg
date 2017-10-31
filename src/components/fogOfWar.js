import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import {toggleFog} from '../AC/toggleFog';


class fogOfWar extends Component {
  render() {
    return (
      <button type="button" onClick={this.onClick}>Toggle Fog of War</button>
    );
  }

  onClick = (ev)=> {
    const {toggleFog}=this.props;
    ev.preventDefault();
    toggleFog();
  }
}

export default connect(null, {toggleFog})(fogOfWar);
