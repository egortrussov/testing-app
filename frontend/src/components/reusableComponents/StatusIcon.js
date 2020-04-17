import React, { Component } from 'react'

import './css/style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

export default class StatusIcon extends Component {
    render() {
        const { percent } = this.props;

        let extraClassName = '';

        if (percent >= 85)
            extraClassName = 'excellent';
        else if (percent >= 65)
            extraClassName = 'good';
        else if (percent >= 40)
            extraClassName = 'satisfactory';
        else extraClassName = 'bad';

        return (
            <span className={ `status-icon ${ extraClassName }` }>
                <FontAwesomeIcon icon={ faCrown } />
            </span>
        )
    }
}
