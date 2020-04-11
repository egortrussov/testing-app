import React from 'react'

import { Link } from 'react-router-dom'

import { formatDate } from '../../../middleware/dateFormat'
import PointsCard from '../PointsCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

const TestCard = ({ test, type, user }) => {

    let linkToTest = '';
    if (type === 'full' || type === 'created')
        linkToTest = `/app/testInfo/${ test._id }`;
    else 
        linkToTest = `/app/testInfo/${ test.testId }`;
    
    if (test.description) {
        let newDescription = test.description;
        if (newDescription.length >= 50) {
            newDescription = newDescription.slice(0, 50)
            newDescription += '...';
        }
        test.description = newDescription;
    }
    
    

    if (type === 'result')
        return (
            <Link to={ linkToTest } key={ test._id } >
                <div className="test-card">
                    <h3 className="test-card__title">
                        { test.title }
                    </h3>
                    <PointsCard points={ test.points } maxPoints={ test.maxPoints } />
                    <Link className="result-link" to={ `/app/testResult/${ user._id }/${ test._id }` }>
                        View result
                    </Link>
                    <h4 className="test-card__date">
                        { formatDate(test.date) }
                    </h4>
                </div>
            </Link>
        )
    
    if (type === 'created') 
        return (
            <Link to={ linkToTest }>
                <div className="test-card">
                    <h3 className="test-card__title">
                        { test.title }
                    </h3>
                    <h4 className="test-card__subject">
                        { test.subject }
                    </h4>
                    <div className="test-card__btns">
                        <div className="btns-btn left"><FontAwesomeIcon className="icon" icon={ faThumbsUp } /> <span>{ test.likes.length ? test.likes.length : 0 }</span> </div>
                        <div className="btns-btn right"><FontAwesomeIcon className="icon" icon={ faUser } /> <span>{ test.results.length }</span> </div>
                    </div>
                    <h4 className="test-card__date">
                        { formatDate(test.createdAt) }
                    </h4>
                </div>
            </Link>
        )
    
    if (type === 'full') 
        return (
            <Link to={ linkToTest }>
                <div className="test-card">
                    <h3 className="test-card__title">
                        { test.title }
                    </h3>
                    <h4 className="test-card__subject">
                        { test.subject }
                    </h4>
                    <p className="test-card__description">
                        { test.description ? test.description : 'No description provided!' }
                    </p>
                    <div className="test-card__btns">
                        <div className="btns-btn left"><FontAwesomeIcon className="icon" icon={ faThumbsUp } /> <span>{ test.likes.length ? test.likes.length : 0 }</span> </div>
                        <div className="btns-btn right"><FontAwesomeIcon className="icon" icon={ faUser } /> <span>{ test.results.length }</span> </div>
                    </div>
                    <h4 className="test-card__date">
                        { formatDate(test.createdAt) }
                    </h4>
                </div>
            </Link>
        )
}

export default TestCard
