import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './css/style.css'

export default class Tests extends Component {
    state = {
        isLoading: true,
        tests: null
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/tests/allTests')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    isLoading: false,
                    tests: res
                })
            })
    }

    render() {
        const { isLoading, tests } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                <h1 className="heading">Available tests: </h1>
                { tests.map(test => {
                    const linkToTest = `/app/testInfo/${ test._id }`

                    return (
                        <Link to={ linkToTest }>
                            <div key={ test._id } className="test-card">
                                <div className="text-card-left">
                                    <h3 className="test-title">{ test.title }</h3>
                                    <h4 className="test-date">Date: { test.createdAt }</h4>
                                </div>
                                <div className="test-card-right">
                                    <h3 className="test-subject">Subject: <span className="subject">{ test.subject }</span></h3>
                                    <h3>Times passed: { test.results.length }</h3>
                                </div>
                            </div>
                        </Link>
                    )
                }) }
            </div>
        )
    }
}
