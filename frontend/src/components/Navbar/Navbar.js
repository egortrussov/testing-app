import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'

class Navbar extends Component {
    static contextType = TestsContext;

    componentDidMount() {
        let value = this.context;
        console.log(value);
        
    }

    render() {
        return (
            <nav>
                <div className="nav-item nav-top">
                    <h2 className="logo">EasyTest</h2>
                </div>
                <div className="nav-item nav-middle">
                    <NavLink exact className="nav-link" to="/app/">Home</NavLink>
                    <NavLink className="nav-link" to="/app/allTests">Tests</NavLink>
                    <NavLink className="nav-link" to="/app/createTest">Create Test</NavLink>
                </div>
                <div className="nav-item nav-bottom">
                    <NavLink className="nav-link" to="/app/login">Login</NavLink>
                    <NavLink className="nav-link" to="/app/register">Register</NavLink>
                </div>
            </nav>
        )
    }
}

export default Navbar