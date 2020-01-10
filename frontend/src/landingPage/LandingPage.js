import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <h1>Testing App</h1>
                <Link to='/app'>
                    <h3>Use!</h3>
                </Link>
            </div>
        )
    }
}
