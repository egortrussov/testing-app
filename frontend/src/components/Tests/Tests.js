import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner'

import { formatDate } from '../../middleware/dateFormat'
import { getHeaders } from '../../middleware/authMiddleware'

import './css/style.css'

export default class Tests extends Component {
    state = {
        isLoading: true,
        tests: [],
        isRedirectToLogin: false
    }

    static contextType = TestsContext;

    componentDidMount() {
        fetch('https://testing-app-easytest.herokuapp.com/api/tests/allTests', {
            headers: getHeaders()
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.isTokenError) {
                    this.context.logout();
                    window.location.href = '/app/login'
                } else {
                    this.setState({
                        isLoading: false,
                        tests: res
                    })
                }
                
            })
    }

    render() {
        const { isLoading, tests, isRedirectToLogin } = this.state;

        if (isRedirectToLogin) return (
            <Redirect to="/app/login" />
        )

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <h1 className="heading">Available tests: </h1>
                { tests.map(test => {
                    const linkToTest = `/app/testInfo/${ test._id }`

                    return (
                        <Link to={ linkToTest }>
                            <div key={ test._id } className="test-card">
                                <div className="text-card-left">
                                    <h3 className="test-title">{ test.title }</h3>
                                    <h4 className="test-date">Date: { formatDate(test.createdAt) }</h4>
                                </div>
                                <div className="test-card-right">
                                    <h3 className="test-subject">Subject: <span className="subject">{ test.subject }</span></h3>
                                    <h3>Times passed: { test.results.length }</h3>
                                </div>
                            </div>
                        </Link>
                    )
                }) }
            </div>
        )
    }
}
