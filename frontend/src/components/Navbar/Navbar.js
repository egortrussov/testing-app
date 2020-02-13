import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ls from 'local-storage'

import TestsContext from '../../context/TestsContext'

class Navbar extends Component {
    state = {
        isLoggedIn: false
    }

    static contextType = TestsContext;

    // componentDidMount() {
    //     let value = this.context;
    //     console.log(value.token !== '');
        
    //     if (value.token !== '') {
    //         this.setState({
    //             isLoggedIn: true
    //         })
    //     }
    // }

    logout() {
        this.context.logout();
        window.location.href = process.env.PUBLIC_URL + '/app/login'
    }

    render() {
        const token = ls.get('token');
        console.log(token);
        
        let isLoggedIn = token !== '';

        return (
            <nav>
                <div className="nav-item nav-top">
                    <h2 className="logo">EasyTest</h2>
                </div>
                <div className="nav-item nav-middle">
                    <NavLink exact className="nav-link" to={process.env.PUBLIC_URL+"/app/"}><i className="fas fa-home"></i> Home</NavLink>
                    <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/allTests"}><i className="fas fa-align-left"></i> Tests</NavLink>
                    <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/createTest"}><i className="fas fa-pen-alt"></i> Create Test</NavLink>
                </div>
                <div className="nav-item nav-bottom">
                    { !isLoggedIn && (
                        <>
                            <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/login"}>Login</NavLink>
                            <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/register"}>Register</NavLink>
                        </>
                    ) }
                    { isLoggedIn && (
                        <button className="nav-link" onClick={ this.logout.bind(this) } >Logout</button>
                    ) }                    
                </div>
            </nav>
        )
    }
}

export default Navbar