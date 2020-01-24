import React, { Component } from 'react'

import './css/style.css'

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    }

    setCredential(e) {
        this.setState({
            [e.target.id]: e.target.innerText
        });
    }

    registerUser(e) {
        e.preventDefault();
        const newUser = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        };
        if (this.state.confirmPassword !== newUser.password) {
            return;
        };
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(res => alert(res))
    }

    render() {
        return (
            <>
                <h1 className="heading">Register</h1>
                <form onSubmit={ (e) => this.registerUser(e) }>
                    <div className="form-group">
                        <label htmlFor="">E-mail: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="email"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Full name: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="name"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="password"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Confirm password: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="confirmPassword"></span>
                    </div>
                    <input type="submit" className="btn btn-cta" value="Create account" />
                </form>
            </>
        )
    }
}
