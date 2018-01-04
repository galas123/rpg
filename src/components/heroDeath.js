import React, {Component} from 'react';

export default class HeroDeath extends Component {
    render() {
        return (
            <div className="rpg-looser">
                <div>You are dead!</div>
                <div className="continue-hint">If you want to continue press Space</div>
            </div>
        )
    }
}
