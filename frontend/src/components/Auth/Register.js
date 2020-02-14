import React, { Component } from 'react'

import './css/style.css'

import { validate } from '../../middleware/validator'
import TestsContext from '../../context/TestsContext'

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        errors: []
    }

    static contextType = TestsContext;

    componentDidMount() {
        const psw = document.querySelector('#password');
        const psw1 = document.querySelector('#confirmPassword');
        const email = document.querySelector('#email');
        psw.addEventListener('focus',function(e){ /*yourcode*/ },false);
        psw.addEventListener('keyup',function(e){ console.log(e.keyCode) },false);
        psw1.addEventListener('focus',function(e){ /*yourcode*/ },false);
        psw1.addEventListener('keyup',function(e){ console.log(e.keyCode) },false);
        email.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
                // let form = document.querySelector('form#login-form');
                // form.submit()
            }
         },false);
        let fields = document.querySelectorAll('.field');
        fields.forEach(field => {
            field.addEventListener('keypress',function(e){ 
                if (e.which === 13) {
                    e.preventDefault();
                }
            });
        }) 
        psw.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
            }
         },false);
        psw1.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
            }
         },false);
    }
    

    setCredential(e) {
        this.setState({
            [e.target.id]: e.target.innerHTML
        });
    }

    registerUser(e) {
        e.preventDefault();

        let data = [
            { name: 'email', value: this.state.email },
            { name: 'password', value: this.state.password },
            { name: 'fullName', value: this.state.name }
        ];
        let errors = validate(data);
        if (this.state.password !== this.state.confirmPassword) {
            errors['confirmPassword'] = 'Passwords do not match'
        }
        
        if (errors['email'] || errors['password'] || errors['fullName'] || errors['confirmPassword']) {
            this.setState({
                ...this.state,
                errors: errors
            })
        } else {
            const newUser = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name
            };
            if (this.state.confirmPassword !== newUser.password) {
                return;
            };
            fetch(`${ this.context.proxy }/api/users/addUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    
                    if (res.notSuccess) {
                        errors = [];
                        errors['email'] = 'User with such email already exists';
                        this.setState({
                            ...this.state,
                            errors
                        })
                    } else {
                        this.context.setToken(res.token, res.user._id);
                        window.location.href = '/app/'
                    }
                })
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <>
                <h1 className="heading">Register</h1>
                <form onSubmit={ (e) => this.registerUser(e) }>
                    <div className="form-group">
                        <label htmlFor="">E-mail: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="email"></span>
                        <span className="error-input">{ errors['email'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Full name: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="name"></span>
                        <span className="error-input">{ errors['fullName'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="password"></span>
                        <span className="error-input">{ errors['password'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Confirm password: </label>
                        <span onInput={ (e) => this.setCredential(e) }  contenteditable="true" className="field" type="text" name="" id="confirmPassword"></span>
                        <span className="error-input">{ errors['confirmPassword'] }</span>
                    </div>
                    <input type="submit" className="btn btn-cta" value="Create account" />
                </form>
            </>
        )
    }
}
