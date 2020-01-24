import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'

class Navbar extends Component {
    state = {
        isLoggedIn: false
    }

    static contextType = TestsContext;

    componentDidMount() {
        let value = this.context;
        console.log(value.token !== '');
        
        if (value.token !== '') {
            this.setState({
                isLoggedIn: true
            })
        }
    }

    logout() {
        this.context.logout();
        window.location.href = '/app/login'
    }

    render() {
        const { isLoggedIn } = this.state;

        return (
            <nav>
                <div className="nav-item nav-top">
                    <h2 className="logo">EasyTest</h2>
                </div>
                <div className="nav-item nav-middle">
                    <NavLink exact className="nav-link" to="/app/"><i className="fas fa-home"></i> Home</NavLink>
                    <NavLink className="nav-link" to="/app/allTests"><i className="fas fa-align-left"></i> Tests</NavLink>
                    <NavLink className="nav-link" to="/app/createTest"><i className="fas fa-pen-alt"></i> Create Test</NavLink>
                </div>
                <div className="nav-item nav-bottom">
                    { !isLoggedIn && (
                        <>
                            <NavLink className="nav-link" to="/app/login">Login</NavLink>
                            <NavLink className="nav-link" to="/app/register">Register</NavLink>
                        </>
                    ) }
                    { isLoggedIn && (
                        <a className="nav-link" onClick={ this.logout.bind(this) } href="" >Logout</a>
                    ) }                    
                </div>
            </nav>
        )
    }
}

export default Navbar