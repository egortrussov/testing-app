import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner'

import { formatDate } from '../../middleware/dateFormat'
import { getHeaders } from '../../middleware/authMiddleware'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

import './css/style.css'

export default class Tests extends Component {
    state = {
        isLoading: true,
        tests: [],
        isRedirectToLogin: false
    }

    static contextType = TestsContext;

    componentDidMount() {
        console.log(this.context);
        
        fetch(`${ this.context.proxy }/api/tests/allTests`, {
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
                { tests.length === 0 ? ( <h2>Oops, no tests available yet!</h2> ) : ( <></> ) }
                <div className="tests-container">
                    { tests.map(test => {
                        const linkToTest = `/app/testInfo/${ test._id }`

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
                                        <div class="btns-btn right"><FontAwesomeIcon className="icon" icon={ faThumbsUp } /> <span>{ test.results.length }</span> </div>
                                    </div>
                                    <h4 class="test-card__date">
                                        { formatDate(test.createdAt) }
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
