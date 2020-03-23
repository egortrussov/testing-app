import React, { Component, Suspense } from 'react'
import Spinner from '../Spinner/Spinner'
import { getHeaders } from '../../middleware/authMiddleware'
import { formatDate } from '../../middleware/dateFormat'
import { Link } from 'react-router-dom'

import PointsCard from '../reusableComponents/PointsCard'

import TestsContext from '../../context/TestsContext'

import './css/style.css'

const TestsContainer = React.lazy(() => import('../reusableComponents/tests/TestsContainer'))

export default class Profile extends Component {
    state = {
        user: null,
        passedTests: [],
        avgResult: null,
        isLoading: true,
        nextLinkVal: null
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

        console.log(user)

        let tempTests = [];

        if (isLoading || !user) return (
            <Spinner />
        )

        const urlToFetch = `${ this.context.proxy }/api/tests/passedTests/${ user._id }`;

        return (
            <div>
                <h1 className="heading">
                    Hello, { user.name }!
                </h1>
                <div className="profile-block">
                    <div className="profile-img">
                        <img src="/img/profile-img.svg" alt=""/>
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
                { <Suspense fallback={ <Spinner /> }>
                    <TestsContainer type="result" urlToFetch={ urlToFetch } user={ user } />
                </Suspense> }
            </div>
        )
    }
}
