import React from 'react'

import { Link } from 'react-router-dom'

import { formatDate } from '../../../middleware/dateFormat'
import PointsCard from '../PointsCard'

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
}

export default TestCard
