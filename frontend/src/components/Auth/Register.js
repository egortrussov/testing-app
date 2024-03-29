import React, { Component } from 'react'

import './css/style.css'

import Spinner from '../Spinner/Spinner'

import { validate } from '../../middleware/validator'
import { getPasswordStrenth } from '../../middleware/passwordStrenth'
import AuthContext from '../../context/AuthContext'
import Input from '../reusableComponents/inputField/Input'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class Register extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        isTeacher: false,
        errors: [],
        isLoading: false
    }

    static contextType = AuthContext;

    setCredential(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    setLoading(state) {
        this.setState({
            isLoading: state
        })
    }

    setTeacherState() {
        this.setState({
            ...this.state,
            isTeacher: !this.state.isTeacher
        })
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
                errors: errors,
                isLoading: false
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
                            errors,
                            isLoading: false
                        })
                    } else {
                        this.context.setToken(res.token, res.user._id);
                        window.location.href = '/app/'
                    }
                })
        }
    }

    render() {
        const { errors, isLoading, password } = this.state;

        let { strenth, className } = getPasswordStrenth(password);

        return (
            <>
                <h1 className="heading">Register</h1>
                <form onSubmit={ (e) => this.registerUser(e) }>
                    <div className="form-group">
                        <label htmlFor="">E-mail: </label>
                        <Input type="text" name="email" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['email'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Full name: </label>
                        <Input type="text" name="name" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['fullName'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password: { strenth && <span className={ "strenth-text " + className }>({ strenth })</span> } </label>
                        <Input type="password" name="password" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['password'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Confirm password: </label>
                        <Input type="password" name="confirmPassword" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['confirmPassword'] }</span>
                    </div>
                    <div className="checkbox-group pretty p-icon p-smooth p-thick p-curve">
                        <input type="checkbox" onChange={ this.setTeacherState.bind(this) } />
                        <div className="state p-success">
                            <i className="icon">
                            <FontAwesomeIcon className="check-icon" icon={ faCheck } />
                            </i>
                            <label>Register as teacher</label>
                        </div>
                    </div>
                    <input onClick={ () => this.setLoading(true) } type="submit" className="btn btn-cta" value="Create account" />
                    { isLoading && <Spinner size="sm" /> }
                </form>
            </>
        )
    }
}
