import React, { Component } from 'react'
import Spinner from '../Spinner/Spinner'
import { getHeaders } from '../../middleware/authMiddleware'
import { formatDate } from '../../middleware/dateFormat'
import { Link } from 'react-router-dom'

import PointsCard from '../reusableComponents/PointsCard'

import TestsContext from '../../context/TestsContext'

export default class Profile extends Component {
    state = {
        user: null,
        passedTests: [],
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

                this.setState({
                    user: res,
                    isLoading: false
                })
            })
    }
    

    render() {
        const { user, isLoading } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <h1 className="heading">
                    Hello, { user.name }!
                </h1>
                <h2>Your recent tests: </h2>
                { user.passedTests.map(test => {
                    console.log(test);
                    const linkToTest = `/app/testInfo/${ test.testId }`

                    return (
                        <Link to={ linkToTest } key={ test._id } className="test-card">
                            <div className="test-card-left">
                                <h3>{ test.title }</h3>
                                <h4>{ formatDate(test.date) }</h4>
                            </div>
                            <div className="test-card-right">
                                <PointsCard points={ test.points } maxPoints={ test.maxPoints } />
                                <Link className="result-link" to={ `/app/testResult/${ user._id }/${ test._id }` }>
                                    View result
                                </Link>
                            </div>
                        </Link>
                    )
                }) }
            </div>
        )
    }
}
