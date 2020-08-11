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
        createdTests: [],
        left: 0,
        right: 3,
        isMoreTests: true,
        isRedirectToLogin: false
    }

    static contextType = TestsContext;

    loadMore() {
        const { urlToFetch, authContext, containerType, type } = this.props;
        let { left, right, tests, isMoreTests, createdTests } = this.state;
        console.log(isMoreTests, this.context.hasMoreTests, '-----+++++++')
        if (!this.context.hasMoreTests && containerType === 'tests') {
            return;
        }
        console.log(tests.length)

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
                if (type === 'full')
                    res.tests.forEach(test => tests.push(test));
                else 
                    tests = res.tests;
                if (containerType === 'tests') {
                    this.context.allTests = tests;
                    this.context.hasMoreTests = res.isMoreTests;
                }
                if (type === 'created') {
                    createdTests = tests;

                }
                let isMoreTests = res.isMoreTests;
                if (type === 'created') 
                    isMoreTests = false;
                this.setState({
                    ...this.state,
                    tests,
                    left: left + 3,
                    right: right + 3,
                    isMoreTests,
                    createdTests
                }, () => console.log(this.state.tests))
            });
    }

    componentWillMount() {
        if (this.props.type === 'full') {
            if (this.context.allTests) {
                console.log(this.context.allTests.length, '+-+-')
                this.setState({
                    ...this.state,
                    tests: this.context.allTests,
                    left: this.context.allTests.length,
                    right: this.context.allTests.length + 3,
                    isMoreTests: this.context.hasMoreTests
                })
            }
        }
        console.log(this.state.tests.length, '==============')
        if (this.props.type === 'created') {
            
        }
    }
    
    

    render() {
        const { type, user } = this.props;

        let { isLoading, tests, isRedirectToLogin, isMoreTests, createdTests } = this.state;

        let hasPreloadedTests = false;

        if (isRedirectToLogin) return (
            <Redirect to="/app/login" />
        )

        if (isLoading || !tests) return (
            <Spinner />
        )

        let items = [];
        // console.log(TestsContext)
        
        // if (type === 'full' && this.context.allTests) {
        //     tests = this.context.allTests;
        //     hasPreloadedTests = true;
        // }

        console.log(this.context.hasMoreTests) 

        if (type === 'full')
            tests.map((test, inx) => {
                return items.push (
                    <Suspense key={ inx } fallback={ <Spinner size="sm" /> } >
                        <TestCard key={ `${ inx }-${ inx }` } type={ type } test={ test } user={ user || null } />
                    </Suspense> 
                )
            })
        else 
            createdTests.map((test, inx) => {
                return items.push (
                    <Suspense key={ inx } fallback={ <Spinner size="sm" /> } >
                        <TestCard key={ `${ inx }-${ inx }` } type={ type } test={ test } user={ user || null } />
                    </Suspense> 
                )
            })

        console.log(type, 'lppl')

        return (
            <>
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
            </>
        )
    }
}
