import React, { Component, Suspense } from 'react'
import { Link, Redirect } from 'react-router-dom'
import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner'

import { formatDate } from '../../middleware/dateFormat'
import { getHeaders } from '../../middleware/authMiddleware'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

import './css/style.css'

const TestsContainer = React.lazy(() => import('../reusableComponents/tests/TestsContainer'))

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

        let tempTests = [];

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
                { <Suspense fallback={ <Spinner /> }>
                    <TestsContainer type="full" tests={ tests } />
                </Suspense> }
            </div>
        )
    }
}
