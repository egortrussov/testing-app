import React, { Component } from 'react'
import Spinner from '../Spinner/Spinner'
import { getHeaders } from '../../middleware/authMiddleware'
import { formatDate } from '../../middleware/dateFormat'
import { Link } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'

export default class Profile extends Component {
    state = {
        user: null,
        passedTests: [],
        isLoading: true
    }

    static contextType = TestsContext;

    componentDidMount() {
        fetch('/api/users/user', {
            headers: getHeaders()
        })
            .then(res => res.json())
            .then(res => {
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = '/app/login';
                }
                
                res.passedTests.sort((test1, test2) => {
                    return test2.date - test1.date;
                });

                this.setState({
                    user: res,
                    isLoading: false
                })
            })
    }
    

    render() {
        const { user, isLoading, passedTests } = this.state;

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
                    const linkToTest = `/app/testInfo/${ test.testId }`

                    return (
                        <Link to={ linkToTest } key={ test._id } className="test-card">
                            <div className="test-card-left">
                                <h3>{ test.title }</h3>
                                <h4>{ formatDate(test.date) }</h4>
                            </div>
                            <div className="test-card-right">
                                <h3>Result: { test.points }/{ test.maxPoints }</h3>
                            </div>
                        </Link>
                    )
                }) }
            </div>
        )
    }
}
