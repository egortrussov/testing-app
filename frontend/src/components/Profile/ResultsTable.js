import React, { Component } from 'react'

import TestsContext from '../../context/TestsContext'
import { getHeaders } from '../../middleware/authMiddleware';
import Spinner from '../Spinner/Spinner';

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

        for (let i = left; i < Math.min(tests.length, right); i++) {
            let currTest = tests[i];

            fetch(`${ this.context.proxy }/api/tests/testInfo/${ currTest.testId }`, {
                headers: {
                    ...getHeaders()
                }
            })
                .then(res => res.json())
                .then(res => {
                    if (res.isTokenError) {
                        this.context.logout();
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
                        avgPoints
                    };
                    
                    tests[i] = currTest;
                    console.log(currTest)
                })
        }
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
        })
    }

    componentDidMount() {
        let { user } = this.props;
        let tests = [];
        let testsMap = new Map();

        user.passedTests.forEach(test => {
            let currAttempts = testsMap.get(test.testId);
            if (!currAttempts) 
                currAttempts = 0;
            currAttempts++;
            testsMap.set(test.testId, currAttempts);
            test = {
                ...test,
                attempt: currAttempts
            }
            tests.push(test);
        })
        console.log(tests)

        this.setState({
            ...this.state,
            tests
        }, () => {
            this.loadTests()
        })
        
        
    }
    

    render() {
        const { tests } = this.state;

        if (!tests) return <Spinner size="md" />

        return (
            <div>
                {
                    tests.map(test => {
                        console.log(test.avgPoints)
                        return (
                            <h3>{ test.title }, { test.attempt }</h3>
                        )
                    })
                }
            </div>
        )
    }
}
