import React, {Component} from 'react';

export default class HeroAttribute extends Component {
    render() {
        const {name, value} = this.props;
        let extraContent;
        if (name.indexOf("Next")!==-1)
        {
            extraContent=(<span>XP</span>);
        }
        else {
            extraContent=null;
        }
        return (
            <div className="hero-attribute">
                <dt className="hero-attribute-caption">{name}</dt>
                <dd className="hero-attribute-value">{value}</dd>{extraContent}
            </div>
        );
    }
}