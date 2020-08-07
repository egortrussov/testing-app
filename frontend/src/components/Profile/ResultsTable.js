import React, { Component } from 'react'

import AuthContext from '../../context/AuthContext'
import { getHeaders } from '../../middleware/authMiddleware';
import Spinner from '../Spinner/Spinner';
import Table from './ResultsTable/Table';
import TestsContext from '../../context/TestsContext';

export default class ResultsTable extends Component {

    state = {
        results: [],
        tests: [],
        isLoading: true,
        left: 0,
        right: 5,
        isRedirectToLogin: false,
        isMoreTests: true
    }

    static contextType = TestsContext;

    constructor(props) {
        super(props);
    }

    loadTests() {
        let { left, right, tests, isMoreTests } = this.state;
        let { authContext } = this.props;

        console.log(left, right)

        for (let i = left; i < Math.min(tests.length, right); i++) {
            let currTest = tests[i];
            console.log(i)

            fetch(`${ authContext.proxy }/api/tests/testInfo/${ currTest.testId }`, {
                headers: {
                    ...getHeaders()
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.isTokenError) {
                        authContext.logout();
                        this.setState({
                            ...this.state,
                            isRedirectToLogin: true
                        })
                        return true;
                    }
                    let testResults = res.results;
                    console.log(testResults)
                    let avgPoints = 0;
                    testResults.forEach(result => {
                        avgPoints += +result.points;
                    })
                    avgPoints = Math.floor(avgPoints / testResults.length);
                    console.log(avgPoints)
                    currTest = {
                        ...currTest,
                        avgPoints,
                        subject: res.subject
                    };
                    
                    tests[i] = currTest;
                    this.setState({
                        ...this.state,
                        tests
                    })
                    console.log(currTest)
                })
                .then(() => {
                    if (i + 1 === Math.min(tests.length, right)) {
                        this.context.results = tests.slice(0, right);
                        left = right;
                        right += 5;
                        if (left >= tests.length) 
                            isMoreTests = false;
                        this.setState({
                            ...this.state,
                            tests,
                            left,
                            right,
                            isMoreTests
                        }, () => console.log('okokokok'))
                    }
                })
        }
    }

    componentWillMount() {
        let { user } = this.props;
        let tests = [];
        let testsMap = new Map();

        let { results } = this.context;

        user.passedTests.forEach(test => {
            let currAttempts = testsMap.get(test.testId);
            if (!currAttempts) 
                currAttempts = 0;
            currAttempts++;
            testsMap.set(test.testId, currAttempts);
            let totalAttempts = user.passedTests.filter(passedTest => passedTest.testId === test.testId).length;
            test = {
                ...test,
                attempt: totalAttempts + 1 - currAttempts,
            }
            tests.push(test);
        })

        if (results) {
            for (let i = 0; i < results.length; i++) {
                let result = results[i];
                tests[i] = result;
            }

            this.setState({
                ...this.state,
                tests,
                left: results.length,
                right: results.length + 5
            })

            return;
        }

        this.setState({
            ...this.state,
            tests,
            isLoading: false
        }, () => {
            this.loadTests()
        })
        
        
    }
    

    render() {
        const { tests, left, right, isMoreTests, isLoading } = this.state;

        if (isLoading) return <Spinner size="md" />

        let testsToShow = tests.slice(0, left);

        return (
            <div>
                {
                    testsToShow.length ? (
                        <Table tests={ testsToShow } />

                    ) : ''
                }
                {
                    (testsToShow.length && isMoreTests) ? (
                        <button className="load-more" onClick={ () => this.loadTests() }>Load more</button>
                    ) : ''
                }
            </div>
        )
    }
}
