import React, { Component, Suspense } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../context/AuthContext'
import Spinner from '../Spinner/Spinner';
import TestsContainer from '../reusableComponents/tests/TestsContainer'

export default class CreateTest extends Component {
    state = {
        createdTests: [],
        isLoading: false
    }

    static contextType = AuthContext;

    componentDidMount() {
        if (!this.context.userId) 
            window.location.href = '/app/login';
        fetch(`${ this.context.proxy }/api/tests/createdTests/${ this.context.userId }`, {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                this.setState({
                    createdTests: res.tests,
                    isLoading: false
                })
            })
    }
    
    render() {
        const { createdTests, isLoading } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        let urlToFetch = `${ this.context.proxy }/api/tests/createdTests/${ this.context.userId }`;

        return (
            <>
                <h1 className="heading">
                    Currently, you have { createdTests.length } created tests
                </h1>
                <Link to="/app/createTestForm" className="btn btn-cta">
                    New test
                </Link>
                { <Suspense fallback={ <Spinner /> }>
                    <TestsContainer type="created" urlToFetch={ urlToFetch } user={ null } />
                </Suspense> }
            </>
        )
    }
}
