import React, {
  Component
} from 'react';
import {connect} from 'react-redux';
import {toggleFog} from '../AC/toggleFog';


class fogOfWarToggler extends Component {
  render() {
    return (
      <div className="toggle-fog">
        <button className="toggle-fog" type="button" onClick={this.onClick}>Toggle Fog of War</button>
      </div>
    );
  }

  onClick = (ev)=> {
    const {toggleFog}=this.props;
    ev.preventDefault();
    toggleFog();
  }
}

export default connect(null, {toggleFog})(fogOfWarToggler);
