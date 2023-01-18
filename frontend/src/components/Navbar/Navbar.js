import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import ls from 'local-storage'

import { init } from './navbarScript'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faAlignLeft, faPenAlt, faSignInAlt, faSignOutAlt, faUserPlus, faChevronLeft, faCat } from '@fortawesome/free-solid-svg-icons'

import Logo from './img/logo.svg'

import AuthContext from '../../context/AuthContext'

class Navbar extends Component {
    state = {
        isLoggedIn: false,
        isHidden: false
    }

    componentDidMount() {
        init();
    }
    

    static contextType = AuthContext;

    logout() {
        this.context.logout();
        window.location.href = process.env.PUBLIC_URL + '/app/login'
    }

    render() {
        const { isHiiden } = this.state;

        const token = ls.get('token');
        
        let isLoggedIn = token !== '';

        let rnd = Math.floor(Math.random() * 100) % 3;

        return (
            <nav>
                <div className="toggle-view" id="toggle-view">
                    <FontAwesomeIcon className="icon" icon={ faChevronLeft } />
                </div>
                <div className="nav-item nav-top">
                    <a href="/">
                        {
                            rnd === 0 ? (
                                <>
                                    <h2 className="logo"><FontAwesomeIcon className="cat-icon" icon={ faCat } /><span className="text">EasyTest</span></h2>
                                </>
                            ) : (
                                <>
                                    <h2 className="logo"><img src={ Logo } alt=""/> <span className="text">EasyTest</span></h2>
                                </>
                            )
                        }
                    </a>
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