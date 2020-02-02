import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Navbar from './Navbar/Navbar'

import Profile from './Profile/Profile'
import Tests from './Tests/Tests'
import TestInfo from './Tests/TestInfo'
import CreateTest from './CreateTest/CreateTest'
import TestResult from './TestResult/TestResult'
import CreateTestForm from './CreateTest/CreateTestForm'
import PassTest from './PassTest/PassTest'
import Login from './Auth/Login'
import Register from './Auth/Register'

import './css/MainPage.css'
import './css/GlobalStyles/style.css'

export default class MainPage extends Component {

    render() {
        return (
            <BrowserRouter>

                <div className="app-container">
                    <Navbar />
                    <main>
                        <Switch>
                            <Route exact path='/app/' component={ Profile } /> 
                            <Route path='/app/allTests' component={ Tests } /> 
                            <Route path='/app/testInfo/:testId' component={ TestInfo } /> 
                            <Route path='/app/testResult/:userId/:resultId' component={ TestResult } /> 
                            <Route path='/app/createTest' component={ CreateTest } /> 
                            <Route path='/app/createTestForm' component={ CreateTestForm } /> 
                            <Route path='/app/passTest/:testId' component={ PassTest } /> 
                            <Route path='/app/login' component={ Login } /> 
                            <Route path='/app/register' component={ Register } /> 
                        </Switch>
                    </main>
                </div>

            </BrowserRouter>
        )
    }
}
