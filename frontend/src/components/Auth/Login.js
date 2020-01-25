import React, { Component } from 'react'


import './css/style.css'

import AuthContext from '../../context/TestsContext'

export default class Login extends Component {
    state = {
        email: '',
        password: '' 
    }

    static contextType = AuthContext;

    componentDidMount() {
        const psw = document.querySelector('#psw');
        const email = document.querySelector('#email');
        psw.addEventListener('focus',function(e){ /*yourcode*/ },false);
        psw.addEventListener('keyup',function(e){ console.log(e.keyCode) },false);
        email.addEventListener('keypress',function(e){ 
            if (e.which === 13) 
                e.preventDefault();
         },false);
        psw.addEventListener('keypress',function(e){ 
            if (e.which === 13) 
                e.preventDefault();
         },false);
    }

    setCredential(e) {
        console.log(e.target);
        
        this.setState({
            ...this.state,
            [e.target.getAttribute('data-name')]: e.target.innerHTML
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const query = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(query)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    this.context.setToken(res.token, res.user._id);
                    window.location.href = '/app/'
                } 
            })
    }

    render() {
        return (
            <div>
                <h1 className="heading">Log in</h1>
                <form onSubmit={ (e) => this.handleSubmit(e) }>
                    <div className="form-group">
                        <label htmlFor="">E-mail: </label>
                        <span data-name="email" onInput={ (e) => this.setCredential(e) } className="field" contentEditable="true" id="email"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password: </label>
                        <span data-name="password" onInput={ (e) => this.setCredential(e) } id="psw" className="field with-input" contentEditable="true">
                        </span>
                    </div>
                    <input type="submit" className="btn btn-cta" value="Log in" />
                </form>
            </div>
        )
    }
}
