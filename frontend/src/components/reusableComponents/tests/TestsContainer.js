import React, { Component, Suspense } from 'react'

import { Redirect } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from '../../Spinner/Spinner'
import { getHeaders } from '../../../middleware/authMiddleware';

import AuthContext from '../../../context/AuthContext'
import TestsContext from '../../../context/TestsContext';

const TestCard = React.lazy(() => import('./TestCard'));

export default class TestsComtainer extends Component {
    state = {
        tests: [],
        left: 0,
        right: 3,
        isMoreTests: true,
        isRedirectToLogin: false
    }

    static contextType = TestsContext;

    loadMore() {
        const { urlToFetch, authContext } = this.props;
        const { left, right, tests } = this.state;
        console.log(urlToFetch)

        fetch(urlToFetch, {
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
                if (res.isTokenError) {
                    authContext.logout();
                    this.setState({
                        ...this.state,
                        isRedirectToLogin: true
                    })
                    return true;
                }
                res.tests.forEach(test => tests.push(test));
                this.context.allTests = tests;
                this.setState({
                    ...this.state,
                    tests,
                    left: left + 3,
                    right: right + 3,
                    isMoreTests: res.isMoreTests
                }, () => console.log(this.state.tests))
            });
    }

    componentDidMount() {
        console.log(TestsContext)
    }
    
    

    render() {
        const { type, user } = this.props;

        let { isLoading, tests, isRedirectToLogin, isMoreTests } = this.state;

        let hasPreloadedTests = false;

        if (isRedirectToLogin) return (
            <Redirect to="/app/login" />
        )

        if (isLoading || !tests) return (
            <Spinner />
        )

        let items = [];
        console.log(TestsContext)
        
        if (type === 'full' && this.context.allTests) {
            tests = this.context.allTests;
            hasPreloadedTests = true;
        }

        tests.map((test, inx) => {
            return items.push (
                <Suspense key={ inx } fallback={ <Spinner size="sm" /> } >
                    <TestCard key={ `${ inx }-${ inx }` } type={ type } test={ test } user={ user || null } />
                </Suspense> 
            )
        })

        return (
            <>
                {
                    !hasPreloadedTests ? (
                        <InfiniteScroll
                            pageStart={ "0" }
                            loadMore={ this.loadMore.bind(this) }
                            hasMore={ isMoreTests }
                            loader={ <Spinner /> }
                            useWindow={ false } >
                            <div className="tests-container">
                                { items.length === 0 ? (type !== 'result' && <h3>Oops, no tests available yet!</h3>) : items }
                            </div>
                            
                        </InfiniteScroll>

                    ) : (
                        items
                    )
                }
            </>
        )
    }
}
