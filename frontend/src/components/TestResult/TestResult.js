import React, { Component } from 'react'

import Spinner from '../Spinner/Spinner'

import './css/style.css'

import AuthContext from '../../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import BackLink from '../reusableComponents/backLink/BackLink'
import QuestionResultCard from './QuestionResultCard'

export default class TestResult extends Component {
    state = {
        isLoading: true,
        test: null,
        answers: null
    }

    static contextType = AuthContext;

    componentDidMount() {
        const userId = this.props.match.params.userId;
        const resultId = this.props.match.params.resultId;
        
        fetch(`${ this.context.proxy }/api/tests/testResult/${ userId }/${ resultId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                this.setState({
                    isLoading: false,
                    answers: res.answers,
                    test: res.test
                })
            })
    }
    

    render() {
        const { isLoading, test, answers } = this.state;
        if (test) console.log(test.questions[0]);
        console.log(answers);
        console.log(this.props)
        
        

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <BackLink link="/app" />
                <h1 className="heading">
                    Test result for "{ test.title }"
                </h1>
                <div className="result-table">
                    <table>
                        <col className="main" />
                        { answers.map(ans => {
                            return (
                                <col className="answer" />
                            )
                        }) }
                        <tr className="first">
                            <th className="first main">Question No.</th>
                            { answers.map((ans, inx) => {
                                return (
                                    <th className="first ans">{ inx + 1 }</th>
                                )
                            }) }
                        </tr>
                        <tr>
                            <th className="main">Result: </th>
                            { answers.map((ans, inx) => {
                                let extraClassName = '';
                                console.log(toString(ans));
                                
                                let isCorrect = true;
                                let question = test.questions[inx];

                                if (ans.length !== question.correctAnswerId.length) 
                                    isCorrect = false;
                                else {
                                    for (let i = 0; i < ans.length; i++) 
                                        if (ans[i] !== question.correctAnswerId[i]) {
                                            isCorrect = false;
                                            break;
                                        }
                                }
                                
                                if (parseInt(ans) === parseInt(test.questions[inx].correctAnswerId)) 
                                    extraClassName = 'correct';
                                else 
                                    extraClassName = 'wrong'
                                return (
                                    <th className={ `answerr ans ${ extraClassName }` }>{ isCorrect ? (<FontAwesomeIcon className="icon" icon={ faCheckCircle } /> ) : (<FontAwesomeIcon className="icon" icon={ faTimesCircle } />) }</th>
                                )
                            }) }
                        </tr>
                    </table>
                </div>
                { answers.map((ans, inx) => {
                    let isCorrect = true;
                    let question = test.questions[inx];

                    if (ans.length !== question.correctAnswerId.length) 
                        isCorrect = false;
                    else {
                        for (let i = 0; i < ans.length; i++) 
                            if (ans[i] !== question.correctAnswerId[i]) {
                                isCorrect = false;
                                break;
                            }
                    }

                    
                    let extraClassName = '';
                    if (!isCorrect) extraClassName = 'wrong';
                    
                    return (
                        <QuestionResultCard
                            question={ question }
                            extraClassName={ extraClassName }
                            ans={ ans }
                            inx={ inx }
                            answers={ answers }
                        />
                    )
                }) }
            </div>
        )
    }
}
