import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ls from 'local-storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAlignLeft, faPenAlt, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import TestsContext from '../../context/TestsContext'

class Navbar extends Component {
    state = {
        isLoggedIn: false
    }

    static contextType = TestsContext;

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
                    <NavLink exact className="nav-link" to={process.env.PUBLIC_URL+"/app/"}><FontAwesomeIcon className="icon" icon={ faHome } /> Home</NavLink>
                    <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/allTests"}><FontAwesomeIcon className="icon" icon={ faAlignLeft } /> Tests</NavLink>
                    <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/createTest"}><FontAwesomeIcon className="icon" icon={ faPenAlt } /> Create Test</NavLink>
                </div>
                <div className="nav-item nav-bottom">
                    { !isLoggedIn && (
                        <>
                            <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/login"}><FontAwesomeIcon className="icon" icon={ faSignInAlt } /> Login</NavLink>
                            <NavLink className="nav-link" to={process.env.PUBLIC_URL+"/app/register"}><FontAwesomeIcon className="icon" icon={ faUserPlus } /> Register</NavLink>
                        </>
                    ) }
                    { isLoggedIn && (
                        <button className="nav-link" onClick={ this.logout.bind(this) } ><FontAwesomeIcon className="icon" icon={ faSignOutAlt } /> Logout</button>
                    ) }                    
                </div>
            </nav>
        )
    }
}

export default Navbar