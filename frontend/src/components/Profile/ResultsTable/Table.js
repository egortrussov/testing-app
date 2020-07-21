import React, { Component } from 'react'
import AuthContext from '../../../context/AuthContext';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export default class Table extends Component {

    state = {
        isRedirectToTest: false,
        testToRedirect: null,
        isRedirectToResult: false
    }

    static contextType = AuthContext;

    redirectToResult(test) {
        this.setState({
            ...this.state,
            testToRedirect: test,
            isRedirectToResult: true
        })
    }

    redirectToTest(test) {
        this.setState({
            ...this.state,
            testToRedirect: test,
            isRedirectToTest: true
        })
    }

    render() {
        const { isRedirectToResult, isRedirectToTest, testToRedirect } = this.state;
        const { tests } = this.props;

        if (isRedirectToResult) return (
            <Redirect to={ `/app/testResult/${ this.context.user._id }/${ testToRedirect._id }` } />
        )

        if (isRedirectToTest) return (
            <Redirect to={ `/app/testInfo/${ testToRedirect._id }` } />
        )

        return (
            <div className="results-table">
                <div className="row head">
                    <div className="cell title">Test name</div>
                    <div className="cell subject">Subject</div>
                    <div className="cell attempt">Attempt No.</div>
                    <div className="cell points">Points</div>
                    <div className="cell points average">Average</div>
                </div>
                {
                    tests.map(test => {
                        return (
                            <div className="row" onClick={ () => this.redirectToResult(test) }>
                                <Link to={ `/app/testInfo/${ test.testId }` } className="cell title">{ test.title }</Link>
                                <div className="cell subject">{ test.subject }</div>
                                <div className="cell attempt">{ test.attempt }</div>
                                <div className="cell points">{ test.points }/{ test.maxPoints } ({ Math.floor(test.points / test.maxPoints * 100) }%)</div>
                                <div className="cell points average">{ test.avgPoints }/{ test.maxPoints } ({ Math.floor(test.avgPoints / test.maxPoints * 100) }%)</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
