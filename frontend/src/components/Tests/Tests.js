import React, { Component, Suspense } from 'react'
import { Redirect } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import Spinner from '../Spinner/Spinner'

import './css/style.css'

const TestsContainer = React.lazy(() => import('../reusableComponents/tests/TestsContainer'))

export default class Tests extends Component {
    state = {
        isLoading: false,
        tests: [],
        isRedirectToLogin: false,
        left: 0,
        right: 3,
        isMoreTests: true
    }

    static contextType = AuthContext;       

    render() {
        const { isLoading, isRedirectToLogin } = this.state;

        const linkToFetch = `${ this.context.proxy }/api/tests/allTests`;

        if (isRedirectToLogin) return (
            <Redirect to="/app/login" />
        )

        if (isLoading) return (
            <Spinner />
        )

        return (
            <>
                <h1 className="heading">Recent tests: </h1>
                <Suspense fallback={ <Spinner /> }>
                    <TestsContainer 
                        urlToFetch={ linkToFetch }
                        authContext={ this.context }
                        type={ "full" } />
                </Suspense>
                
            </>
        )
    }
}
