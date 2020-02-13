import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner'

import PointsCard from '../reusableComponents/PointsCard'

import './css/style.css'

export default class TestInfo extends Component {
    state = {
        isLoading: true,
        test: null,
        testResults: null,
        usernames: null,
        errors: []
    };

    componentDidMount() {
        const testId = this.props.match.params.testId;

        let field = document.querySelector('span.field');
        console.log(field);
        
        if (field !== null && field) field.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
            }
        });
        
        fetch(`https://testing-app-easytest.herokuapp.com/api/tests/testInfo/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    test: res
                })
            })
        fetch(`https://testing-app-easytest.herokuapp.com/api/tests/testResults/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                res.testResults.sort((res1, res2) => {
                    return res2.points - res1.points;
                })
                this.setState({
                    isLoading: false,
                    testResults: res.testResults,
                    usernames: res.usernames
                })
            })
    }

    setAccessKey(e) {
        this.setState({
            ...this.state,
            currentAccessKey: e.target.innerText
        })
    }

    goToTest() {
        console.log(this.state.test);
        
        const { currentAccessKey } = this.state;
        const { accessKey, _id, isProtected } = this.state.test;
        if (accessKey === currentAccessKey || !isProtected) {
            window.location.href = `/app/passTest/${ _id }`
        } else {
            let { errors } = this.state;
            errors['keyError'] = 'Incorrect access key!';
            this.setState({
                ...this.state,
                errors
            })
        }
    }   
    
    componentDidUpdate() {
        let field = document.querySelector('span.field');
        console.log(field);
        
        if (field && field !== null) field.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
            }
        });
    }

    render() {
        const { isLoading, test, testResults, errors } = this.state;
        console.log(test);
        

        if (isLoading || test === null) return (
            <Spinner />
        )

        return (
            <div>
                <div className="page-top">
                    <Link to="/app/allTests">
                        <i className="fas fa-arrow-left"></i> Back 
                    </Link>
                </div>
                <h1>{ test.title }</h1>
                <p>{ test.description }</p>
                { test.isProtected && (
                    //return (
                        <>
                            <br/>
                            <label htmlFor="title">To start the test, you need to type in the secret key!</label> <br/>
                            <span id="field" className="field" contenteditable="true" onInput={ (e) => this.setAccessKey(e) } type="text" name="title"></span>
                            <span className="error-input">{ errors['keyError'] }</span>
                        </>
                    //)
                    
                 ) }
                <br/>
                {/* <Link class="btn btn-cta" to={ `/app/passTest/${ test._id }` }>
                    Pass test!
                </Link> */}
                <button onClick={ () => this.goToTest() } className="btn btn-cta">Pass test!</button>
                
                
                <div className="results">
                    <h3>Results: </h3>
                    <table>
                        <col className="username" />
                        <col className="points" />
                        <tr>
                            <th>User</th>
                            <th className="points">Points</th>
                        </tr>
                        { testResults === null ? () => {
                            return (
                                <Spinner />
                            )
                        } : testResults.map(res => {                            
                            return (
                                <tr className='resultTr' key={ res.userId + res.points }>
                                    <td>{ res.username }</td>
                                    <td className="points">
                                        <PointsCard points={ res.points } maxPoints={ res.answers.length } />
                                    </td>
                                </tr>
                            )
                        }) }
                    </table>
                </div>
                
            </div>
        )
    }
}
