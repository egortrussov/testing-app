import React from 'react'

import { Link } from 'react-router-dom'

import { formatDate } from '../../../middleware/dateFormat'
import PointsCard from '../PointsCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const TestCard = ({ test, type, user }) => {

    const linkToTest = `/app/testInfo/${ test.testId }`

    if (type === 'result')
        return (
            <Link to={ linkToTest } key={ test._id } >
                <div class="test-card">
                    <h3 class="test-card__title">
                        { test.title }
                    </h3>
                    <PointsCard points={ test.points } maxPoints={ test.maxPoints } />
                    <Link className="result-link" to={ `/app/testResult/${ user._id }/${ test._id }` }>
                        View result
                    </Link>
                    <h4 class="test-card__date">
                        { formatDate(test.date) }
                    </h4>
                </div>
            </Link>
        )
    
    if (type === 'full') 
        return (
            <Link to={ linkToTest }>
                <div class="test-card">
                    <h3 class="test-card__title">
                        { test.title }
                    </h3>
                    <h4 class="test-card__subject">
                        { test.subject }
                    </h4>
                    <p class="test-card__description">
                        { test.description ? test.description : 'No description provided!' }
                    </p>
                    <div class="test-card__btns">
                        <div class="btns-btn left"><FontAwesomeIcon className="icon" icon={ faThumbsUp } /> <span>0</span> </div>
                        <div class="btns-btn right"><FontAwesomeIcon className="icon" icon={ faUser } /> <span>{ test.results.length }</span> </div>
                    </div>
                    <h4 class="test-card__date">
                        { formatDate(test.createdAt) }
                    </h4>
                </div>
            </Link>
        )
}

export default TestCard
