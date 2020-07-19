import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        const { tests } = this.props;

        return (
            <div className="results-table">
                <div className="row head">
                    <div className="cell title">Test name</div>
                    <div className="cell subject">Subject</div>
                    <div className="cell attempt">Attempt No.</div>
                    <div className="cell points">Points</div>
                    <div className="cell points">Average</div>
                </div>
                {
                    tests.map(test => {
                        return (
                            <div className="row">
                                <div className="cell title">{ test.title }</div>
                                <div className="cell subject">{ test.subject }</div>
                                <div className="cell attempt">{ test.attempt }</div>
                                <div className="cell points">{ test.points }/{ test.maxPoints } ({ Math.floor(test.points / test.maxPoints * 100) }%)</div>
                                <div className="cell points">{ test.avgPoints }/{ test.maxPoints } ({ Math.floor(test.avgPoints / test.maxPoints * 100) }%)</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
