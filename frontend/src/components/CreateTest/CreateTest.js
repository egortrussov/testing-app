import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'

export default class CreateTest extends Component {
    state = {
        createdTests: [],
    }

    static contextType = TestsContext;

    componentDidMount() {
        if (!this.context.userId) 
            window.location.href = '/app/login';
        fetch(`/api/tests/createdTests/${ this.context.userId }`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    createdTests: res
                })
            })
    }
    
    render() {
        const { createdTests } = this.state;

        return (
            <div>
                <h1 className="heading">
                    Currently, you have { createdTests.length } created tests
                </h1>
                <Link to="/app/createTestForm" className="btn btn-cta">
                    New test
                </Link>
            </div>
        )
    }
}
