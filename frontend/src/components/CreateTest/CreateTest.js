import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner';

export default class CreateTest extends Component {
    state = {
        createdTests: [],
        isLoading: true
    }

    static contextType = TestsContext;

    componentDidMount() {
        if (!this.context.userId) 
            window.location.href = '/app/login';
        fetch(`/api/tests/createdTests/${ this.context.userId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                this.setState({
                    createdTests: res,
                    isLoading: false
                })
            })
    }
    
    render() {
        const { createdTests, isLoading } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <h1 className="heading">
                    Currently, you have { createdTests.length } created tests
                </h1>
                { createdTests.map(test => {
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
                <Link to="/app/createTestForm" className="btn btn-cta">
                    New test
                </Link>
            </div>
        )
    }
}
