import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Logo from './img/logo.svg'
import LogoLight from './img/logo-light.svg'
import Hero from './img/hero.svg'

import './css/style.css'

export default class LandingPage extends Component {
    render() {
        return (
            <header>
                {/* <div className="bg-circle-lg bg-circle"></div> */}
                <div className="bg-circle-md bg-circle"></div>
                <div className="bg-circle-dm bg-circle"></div>
                <div className="nav">
                    <div className="nav-left">
                        <img className="light" src={ Logo } alt="" />
                        <img className="dark" src={ LogoLight } alt="" />
                        <h1>EasyTest</h1>
                    </div>
                </div>
                <div className="hero">
                    <div className="hero-left">
                        <h1>Get your experience in online testing to a whole new level!</h1>
                        <Link className="cta" to="/app/">Try it out!</Link>
                    </div>
                    <div className="hero-right">
                        <img src={ Hero } alt="" />
                    </div>
                </div>
                <div className="copyright">
                    &copy; 2020 Yegor Trussov
                </div>
            </header>
        )
    }
}
