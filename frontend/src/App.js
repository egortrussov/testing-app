import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import ls from 'local-storage'

import TestsContext from './context/TestsContext'

import LandingPage from './landingPage/LandingPage';
import MainPage from './components/MainPage';

import './App.css'

class App extends Component {
    state = {
        userId: ls.get('userId'),
        token: ls.get('token'),
        proxy: ''
    }

    componentWillMount() {
        let proxy = '';
        if (process.env.NODE_ENV === 'production') {
            if (window.location.href.startsWith('https'))
                proxy = 'https://easytestapp.herokuapp.com';
            else if (window.location.href.startsWith('http'))
                proxy = 'http://easytestapp.herokuapp.com';
            else 
                proxy = 'easytestapp.herokuapp.com';
        } else 
            proxy = 'http://localhost:5000';
        console.log(proxy)
        this.setState({
            ...this.state,
            proxy
        })
    }
    

    setToken = (token, userId) => {
        this.setState({
            token: token,
            userId: userId
        })
        ls.set('token', token);
        ls.set('userId', userId);
    }

    logout = () => {
        this.setState({
            token: '',
            userId: ''
        });
        ls.set('token', '');
        ls.set('userId', '');
    }

    render() {
        const { token, userId, proxy } = this.state;
        console.log(process.env);
        console.log(window.location.href);
        
        

        return (
            <BrowserRouter basename={ process.env.PUBLIC_URL }>
                <React.Fragment>
                    <TestsContext.Provider value={{ token, userId, setToken: this.setToken, logout: this.logout, proxy  }}>
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