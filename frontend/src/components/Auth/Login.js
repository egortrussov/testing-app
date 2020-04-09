import React, { Component } from 'react'

import './css/style.css'

import Input from '../reusableComponents/inputField/Input'
import Spinner from '../Spinner/Spinner'

import { validate } from '../../middleware/validator'
import AuthContext from '../../context/TestsContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: [],
        isLongerExpiratuon: false,
        isLoading: false
    }

    constructor(props) {
        super(props);
        this.formEl = React.createRef();        
    }

    static contextType = AuthContext;

    setCredential(e) {
        console.log(e.target);
        
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, () => console.log(this.state)
        )
    }

    setLoading(state) {
        this.setState({
            isLoading: state
        }, () => console.log(this.state))
    }

    setExpirationState() {
        this.setState({
            ...this.state,
            isLongerExpiratuon: !this.state.isLongerExpiratuon
        })
    } 

    handleSubmit(e) {
        e.preventDefault();

        const { email, password, isLongerExpiratuon } = this.state;

        let data = [
            { name: 'email', value: email },
            { name: 'password', value: password }
        ];
        let errors = validate(data);
        console.log(errors['email']);
        
        if (errors['email'] || errors['password']) {
            this.setState({
                ...this.state,
                errors: errors,
                isLoading: false
            })
        } else {
            errors = [];
            const query = {
                email,
                password,
                isLongerExpiratuon
            }
            fetch(`${ this.context.proxy }/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        this.context.setToken(res.token, res.user._id, res.user);
                        window.location.href = '/app/'
                    } else {
                        if (res.doesUserExist) 
                            errors['password'] = 'Incorrect password';
                        else 
                            errors['email'] = 'User does not exist!'
                        this.setState({
                            ...this.state,
                            errors: errors,
                            isLoading: false
                        })
                    }
                })
        }
    }

    render() {
        const { errors, isLoading } = this.state;
        console.log(isLoading);
        

        return (
            <div>
                <h1 className="heading">Log in</h1>
                <form id="login-form" onSubmit={ (e) => this.handleSubmit(e) }>
                    <div className="form-group">
                        <label htmlFor="">Email: </label>
                        <Input name="email" type="text" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['email'] }</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <Input name="password" type="password" onChange={ (e) => this.setCredential(e) } />
                        <span className="error-input">{ errors['password'] }</span>
                    </div>

                    <div className="checkbox-group pretty p-icon p-smooth p-thick p-curve">
                        <input type="checkbox" onChange={ this.setExpirationState.bind(this) } />
                        <div className="state p-success">
                            <i className="icon">
                            <FontAwesomeIcon className="check-icon" icon={ faCheck } />
                            </i>
                            <label>Remember for a day</label>
                        </div>
                    </div>
                    
                    <input onClick={ () => this.setLoading(true) } type="submit" className="btn btn-cta" value="Log in" />
                    { isLoading && <Spinner size="sm" /> }
                </form>
            </div>
        )
    }
}
