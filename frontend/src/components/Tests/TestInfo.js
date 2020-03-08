import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Spinner from '../Spinner/Spinner'

import PointsCard from '../reusableComponents/PointsCard'

import { convertTime } from '../../middleware/convertTime'

import './css/style.css'

import TestsContext from '../../context/TestsContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class TestInfo extends Component {
    state = {
        isLoading: true,
        test: null,
        testResults: null,
        usernames: null,
        errors: []
    };

    static contextType = TestsContext;

    componentDidMount() {
        const testId = this.props.match.params.testId;

        let field = document.querySelector('span.field');
        console.log(field);
        
        if (field !== null && field) field.addEventListener('keypress',function(e){ 
            if (e.which === 13) {
                e.preventDefault();
            }
        });
        
        fetch(`${ this.context.proxy }/api/tests/testInfo/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    test: res
                })
            })
        fetch(`${ this.context.proxy }/api/tests/testResults/${ testId }`)
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
        const { test, errors, testResults } = this.state;
        const { maxAttempts } = test;
        let usedAttemtps = 0;
        testResults.forEach(res => {
            if (res.userId === this.context.userId) 
                usedAttemtps++;
        })
        console.log(usedAttemtps, maxAttempts);
        
        if (maxAttempts && usedAttemtps >= maxAttempts) {
            errors['attempts'] = 'You have not got any attempts left!';
            this.setState({
                ...this.state,
                errors
            })
        } else {
            const { currentAccessKey } = this.state;
            const { accessKey, _id, isProtected } = test;
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
        
        if (isLoading || test === null) return (
            <Spinner />
        )

        const { maxAttempts, timeLimit } = test;
        let usedAttemtps = 0;
        if (testResults) testResults.forEach(res => {
            if (res.userId === this.context.userId) 
                usedAttemtps++;
        })
        const attemtpsLeft = maxAttempts - usedAttemtps;

        return (
            <div>
                <div className="page-top">
                    <Link to="/app/allTests">
                        <FontAwesomeIcon icon={ faArrowLeft } /> Back 
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
                 { maxAttempts && (
                    <div className="attempts-block">
                        <span className="max-attemtts">Attempts left: { attemtpsLeft }</span>
                    </div>
                 ) }
                 { timeLimit && (
                    <div className="attempts-block">
                        <span className="max-attemtts">Time limit: { convertTime(timeLimit) }</span>
                    </div>
                 ) }
                <br/>
                {/* <Link class="btn btn-cta" to={ `/app/passTest/${ test._id }` }>
                    Pass test!
                </Link> */}
                <div className="btn-block">
                    <span className="error-input">{ errors['attempts'] }</span>
                    <button onClick={ () => this.goToTest() } className="btn btn-cta">Pass test!</button>
                </div>
                
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
