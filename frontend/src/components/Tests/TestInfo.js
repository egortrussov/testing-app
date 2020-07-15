import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Spinner from '../Spinner/Spinner'

import PointsCard from '../reusableComponents/PointsCard'
import Input from '../reusableComponents/inputField/Input'

import { convertTime } from '../../middleware/convertTime'

import './css/style.css'

import TestsContext from '../../context/TestsContext'
import { getHeaders } from '../../middleware/authMiddleware';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faThumbsUp as faThumbsUpS } from '@fortawesome/free-solid-svg-icons'
import BackLink from '../reusableComponents/backLink/BackLink';
import ResultsChart from './ResultsChart';

export default class TestInfo extends Component {
    state = {
        isLoading: true,
        test: null,
        testResults: null,
        usernames: null,
        errors: [],
        isRedirectToLogin: false,
        hasLiked: false
    };

    static contextType = TestsContext;

    componentDidMount() {
        const testId = this.props.match.params.testId;
        
        fetch(`${ this.context.proxy }/api/tests/testInfo/${ testId }`, {
            headers: {
                ...getHeaders()
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.isTokenError) {
                    this.context.logout();
                    this.setState({
                        ...this.state,
                        isRedirectToLogin: true
                    })
                } else {
                    let hasLiked = false;
                    if (res.likes.find((like) => like === this.context.userId))
                        hasLiked = true;
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        test: res,
                        hasLiked
                    })
                }
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
            currentAccessKey: e.target.value
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

    setLike() {
        const { test, hasLiked } = this.state;

        fetch(`${ this.context.proxy }/api/tests/likeTest/${ test._id }`, {
            method: 'POST',
            headers: {
                ...getHeaders,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isIncrease: !hasLiked,
                userId: this.context.userId
            })
        }) 
            .then(res => res.json())
            .then(res => {
                let { test } = this.state;
                test.likes = res.likes;
                console.log(test.likes.length)
                this.setState({
                    ...this.state,
                    test,
                    hasLiked: !hasLiked
                }, () => console.log(this.state.hasLiked))
            })
    }

    render() {
        const { isLoading, test, testResults, errors, isRedirectToLogin, hasLiked } = this.state;

        if (isRedirectToLogin) return (
            <Redirect to='/app/login' />
        )
        
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
                <BackLink />
                <h1>{ test.title }</h1>
                <p>{ test.description }</p>
                { test.isProtected && (
                    //return (
                        <>
                            <br/>
                            <label htmlFor="title">To start the test, you need to type in the secret key!</label> <br/>
                            <Input type="text" name="secretKey" isMini={ true } onChange={ (e) => this.setAccessKey(e) } />
                            {/* <span id="field" className="field" contenteditable="true" onInput={ (e) => this.setAccessKey(e) } type="text" name="title"></span> */}
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
                <span className="error-input">{ errors['attempts'] }</span>
                <div className="btn-block">
                    <button onClick={ () => this.goToTest() } className="btn btn-cta">Pass test!</button>
                    <button className="btn like-btn" onClick={ this.setLike.bind(this) } icon={ faThumbsUp }> 
                        <FontAwesomeIcon className="icon" icon={ hasLiked ? faThumbsUpS : faThumbsUp } />
                        <span>{ test.likes.length }</span>
                    </button>
                </div>
                
                <div className="results">
                    <h3>Results: </h3>
                    <ResultsChart />
                    <table>
                        <col className="username" />
                        <col className="points" />
                        <tr>
                            <th className="user">User</th>
                            <th className="points">Time</th>
                            <th className="points">Points</th>
                        </tr>
                        { testResults === null ? () => {
                            return (
                                <Spinner />
                            )
                        } : testResults.map(res => {                            
                            return (
                                <tr className='resultTr' key={ res.userId + res.points }>
                                    <td className="user">{ res.username }</td>
                                    <td className="points time">
                                        { res.time ? ( 
                                            <span>{ convertTime(res.time) }</span>
                                        ) : (
                                            <span>---</span>
                                        ) }
                                    </td>
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
