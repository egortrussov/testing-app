import React, { Component } from 'react'

import './css/style.css'

export default class PointsCard extends Component {
    render() {
        const { points, maxPoints } = this.props;

        let result = points / maxPoints;
        let extraClassName = '';

        if (result >= .85)
            extraClassName = 'excellent';
        else if (result >= .65)
            extraClassName = 'good';
        else if (result >= .40)
            extraClassName = 'satisfactory';
        else extraClassName = 'bad';

        return (
            <span className={ `points-card ${ extraClassName }` }>
                { points }<span className="divider">/</span>{ maxPoints }
            </span>
        )
    }
}
