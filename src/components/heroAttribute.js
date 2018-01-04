import React, {Component} from 'react';

export default class HeroAttribute extends Component {
    render() {
        const {name, value} = this.props;
        return (
            <div className="hero-attribute">
                <dt className="hero-attribute__caption">{name}</dt>
                <dd className="hero-attribute__value">{value}</dd>
            </div>
        );
    }
}