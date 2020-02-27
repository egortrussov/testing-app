import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ls from 'local-storage'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAlignLeft, faPenAlt, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'

import Logo from './img/logo.svg'

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
                    <Link exact to="/">
                        <h2 className="logo"><img src={ Logo } alt=""/> <span className="text">EasyTest</span></h2>
                    </Link>
                </div>
                { 
                    isLoggedIn && (
                        <div className="nav-item nav-middle">
                            <NavLink exact className="nav-link" to={"/app/"}><FontAwesomeIcon className="icon" icon={ faHome } /> <span className="text">Home</span></NavLink>
                            <NavLink className="nav-link" to={"/app/allTests"}><FontAwesomeIcon className="icon" icon={ faAlignLeft } /><span className="text"> Tests</span></NavLink>
                            <NavLink className="nav-link" to={"/app/createTest"}><FontAwesomeIcon className="icon" icon={ faPenAlt } /> <span className="text">Create Test</span></NavLink>
                        </div>
                    )
                }
                
                <div className="nav-item nav-bottom">
                    { !isLoggedIn && (
                        <>
                            <NavLink className="nav-link" to={"/app/login"}><FontAwesomeIcon className="icon" icon={ faSignInAlt } /> <span className="text">Login</span></NavLink>
                            <NavLink className="nav-link" to={"/app/register"}><FontAwesomeIcon className="icon" icon={ faUserPlus } /> <span className="text">Register</span></NavLink>
                        </>
                    ) }
                    { isLoggedIn && (
                        <button className="nav-link" onClick={ this.logout.bind(this) } ><FontAwesomeIcon className="icon" icon={ faSignOutAlt } /> <span className="text">Logout</span></button>
                    ) }                    
                </div>
            </nav>
        )
    }
}

export default Navbar