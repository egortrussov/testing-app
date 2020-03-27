import React, { Component, Suspense } from 'react'
import { Link } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner';
import TestsContainer from '../reusableComponents/tests/TestsContainer'

import { formatDate } from '../../middleware/dateFormat'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default class CreateTest extends Component {
    state = {
        createdTests: [],
        isLoading: false
    }

    static contextType = TestsContext;

    componentDidMount() {
        if (!this.context.userId) 
            window.location.href = '/app/login';
        // fetch(`${ this.context.proxy }/api/tests/createdTests/${ this.context.userId }`)
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
                
        //         this.setState({
        //             createdTests: res,
        //             isLoading: false
        //         })
        //     })
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
