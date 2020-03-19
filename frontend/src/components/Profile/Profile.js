import React, { Component } from 'react'
import Spinner from '../Spinner/Spinner'
import { getHeaders } from '../../middleware/authMiddleware'
import { formatDate } from '../../middleware/dateFormat'
import { Link } from 'react-router-dom'

import PointsCard from '../reusableComponents/PointsCard'

import TestsContext from '../../context/TestsContext'

import './css/style.css'

export default class Profile extends Component {
    state = {
        user: null,
        passedTests: [],
        avgResult: null,
        isLoading: true
    }

    static contextType = TestsContext;

    componentDidMount() {
        fetch(`${ this.context.proxy }/api/users/user`, {
            headers: getHeaders()
        })
            .then(res => res.json())
            .then(res => {
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = '/app/login';
                }
                console.log(res.passedTests);
                
                res.passedTests.reverse();

                let avgResult = 0;
                res.passedTests.forEach(test => {
                    avgResult += test.points / test.maxPoints;
                    console.log(avgResult)
                })
                avgResult /= res.passedTests.length;
                avgResult = Math.floor(avgResult * 100);

                this.setState({
                    user: res,
                    avgResult,
                    isLoading: false,
                })
            })
    }
    

    render() {
        const { user, isLoading, avgResult } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <h1 className="heading">
                    Hello, { user.name }!
                </h1>
                <div className="profile-block">
                    <div className="profile-image">
                        <div className="profile-image__img">
                            <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt=""/>
                        </div>
                        <input type="text" className="image-url" />
                        <span className="hint">(Paste image url here)</span>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info__block">
                            <span className="info-text">Name: { user.name }</span>
                        </div>
                        <div className="profile-info__block">
                            <span className="info-text">Tests passed: { user.passedTests.length }</span>
                        </div>
                        <div className="profile-info__block">
                            <span className="info-text">Average result: { avgResult }%</span>
                        </div>
                    </div>
                </div>
                { user.passedTests.length > 0 ? ( <h2>Your recent tests: </h2> ) : ( <h2>You haven't passed any tests yet!</h2> ) }
                <div className="tests-container">
                    { user.passedTests.map(test => {
                        console.log(test);
                        const linkToTest = `/app/testInfo/${ test.testId }`

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
                    }) }
                </div>
            </div>
        )
    }
}
