import React, { Component } from 'react'

import Spinner from '../Spinner/Spinner'

import './css/style.css'

import AuthContext from '../../context/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import BackLink from '../reusableComponents/backLink/BackLink'

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
                                
                                let isCorrect = ans.toString() === test.questions[inx].correctAnswerId;
                                
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
                    let isCorrect = ans.toString() === test.questions[inx].correctAnswerId;
                    console.log(test.questions);
                    
                    let extraClassName = '';
                    if (!isCorrect) extraClassName = 'wrong';
                    let question = test.questions[inx];
                    console.log(question.answers[parseInt(question.correctAnswerId)]);
                    
                    return (
                        <div className="question-ans">
                            <h3>{ inx + 1 }. { question.title }</h3>
                            { ans ===  0 ? (
                                <span className={ "ans-text " + extraClassName}>
                                    Your answer: -
                                </span>
                            ) : (
                                <span className={ "ans-text " + extraClassName}>
                                    Your answer: { ans }) { question.answers[ans - 1].text }
                                </span>
                            ) } 
                            <span className="ans-text">
                                Correct answer: { question.correctAnswerId }) { question.answers[parseInt(question.correctAnswerId) - 1].text }
                            </span>                           
                        </div>
                    )
                }) }
            </div>
        )
    }
}
