import React, { Component } from 'react'

import './css/style.css'

import { validate } from '../../middleware/validator'
import AuthContext from '../../context/TestsContext'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: []
    }

    constructor(props) {
        super(props);
        this.formEl = React.createRef();        
    }

    static contextType = AuthContext;

    componentDidMount() {
        const psw = document.querySelector('#psw');
        const email = document.querySelector('#email');
        psw.addEventListener('focus',function(e){ /*yourcode*/ },false);
        psw.addEventListener('keyup',function(e){ console.log(e.keyCode) },false);
        email.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
                // let form = document.querySelector('form#login-form');
                // form.submit()
            }
         },false);
        psw.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
                // let form = document.querySelector('form#login-form');
                // form.submit()
            }
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
        e.preventDefault();
        let data = [
            { name: 'email', value: this.state.email },
            { name: 'password', value: this.state.password }
        ];
        let errors = validate(data);
        console.log(errors['email']);
        
        if (errors['email'] || errors['password']) {
            this.setState({
                ...this.state,
                errors: errors
            })
        } else {
            errors = [];
            const query = {
                email: this.state.email,
                password: this.state.password
            }
            fetch('https://testing-app-easytest.herokuapp.com/api/users/login', {
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
                    } else {
                        if (res.doesUserExist) 
                            errors['password'] = 'Incorrect password';
                        else 
                            errors['email'] = 'User does not exist!'
                        this.setState({
                            ...this.state,
                            errors: errors
                        })
                    }
                })
        }
    }

    render() {
        const { errors } = this.state;
        console.log(errors['email']);
        

        return (
            <div>
                <h1 className="heading">Log in</h1>
                <form id="login-form" onSubmit={ (e) => this.handleSubmit(e) }>
                    <div className="form-group">
                        <label htmlFor="">E-mail: </label>
                        <span data-name="email" onInput={ (e) => this.setCredential(e) } className="field" contentEditable="true" id="email"></span>
                        <span className="error-input">{ errors['email'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password: </label>
                        <span data-name="password" onInput={ (e) => this.setCredential(e) } id="psw" className="field with-input" contentEditable="true">
                        </span>
                        <span className="error-input">{ errors['password'] }</span>
                    </div>
                    <input type="submit" className="btn btn-cta" value="Log in" />
                </form>
            </div>
        )
    }
}
