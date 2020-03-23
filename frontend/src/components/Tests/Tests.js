import React, { Component, Suspense } from 'react'
import { Link, Redirect } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner'
import TestCard from '../reusableComponents/tests/TestCard'

import { formatDate } from '../../middleware/dateFormat'
import { getHeaders } from '../../middleware/authMiddleware'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

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

    static contextType = TestsContext;

    // componentDidMount() {
    //     console.log(this.context);
        
    //     fetch(`${ this.context.proxy }/api/tests/allTests`, {
    //         headers: getHeaders()
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res);
    //             if (res.isTokenError) {
    //                 this.context.logout();
    //                 window.location.href = '/app/login'
    //             } else {
    //                 this.setState({
    //                     isLoading: false,
    //                     tests: res
    //                 })
    //             }
                
    //         })
    // }

    loadMore() {
        let { left, right, tests } = this.state;
        console.log('ijijijijiji')
        fetch(`${ this.context.proxy }/api/tests/allTests`, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isLimited: true,
                left,
                right
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                res.tests.forEach(test => tests.push(test));
                this.setState({
                    ...this.state,
                    tests,
                    left: left + 3,
                    right: right + 3,
                    isMoreTests: res.isMoreTests
                }, () => console.log(this.state.tests))
            });
    }

    // componentDidMount() {
    //     this.loadMore();
    // }
    

    render() {
        const { isLoading, tests, isRedirectToLogin, isMoreTests } = this.state;

        let tempTests = [];
        console.log(isMoreTests)

        if (isRedirectToLogin) return (
            <Redirect to="/app/login" />
        )

        if (isLoading) return (
            <Spinner />
        )

        let items = [];
        tests.map(test => {
            items.push (
                <Suspense fallback={ <Spinner size="sm" /> } >
                    <TestCard type={ "full" } test={ test } user={ null } />
                </Suspense> 
            )
        })
        console.log(items)

        return (
            <>
                <h1 className="heading">Available tests: </h1>
                { tests.length === 0 ? ( <h2>Oops, no tests available yet!</h2> ) : ( <></> ) }
                {/* <div className="tests-container"> */}
                    <InfiniteScroll
                        pageStart={ "0" }
                        loadMore={ this.loadMore.bind(this) }
                        hasMore={ isMoreTests }
                        loader={ <Spinner /> }
                        useWindow={ false }
                         >
                        <div className="tests-container">
                            { items }
                        </div>
                        
                    </InfiniteScroll>
                {/* </div> */}
            </>
        )
    }
}
