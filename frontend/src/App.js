import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import TestsContext from './context/TestsContext'

import LandingPage from './landingPage/LandingPage';
import MainPage from './components/MainPage';

import './App.css'

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <TestsContext.Provider value={{ tests: 11 }}>
                        <Switch>
                            <Route exact path="/" component={ LandingPage } />
                            <Route path="/app" component={ MainPage } />
                        </Switch>
                    </TestsContext.Provider>
                </React.Fragment>
            </BrowserRouter>
        )
    }
}

export default App