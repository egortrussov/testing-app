import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class CreateTest extends Component {
    state = {
        createdTests: [],
    }

    componentDidMount() {
        fetch(`/api/tests/createdTests/${ '5e1950da3847642ac073510c' }`)
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
