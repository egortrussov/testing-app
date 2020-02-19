import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../Spinner/Spinner'

import './css/style.css'

import TestsContext from '../../context/TestsContext'

export default class TestResult extends Component {
    state = {
        isLoading: true,
        test: null,
        answers: null
    }

    static contextType = TestsContext;

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
        
        

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <div className="page-top">
                    <Link to="/app/">
                        <i className="fas fa-arrow-left"></i> Back 
                    </Link>
                </div>
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
                                    <th className={ `answerr ans ${ extraClassName }` }>{ isCorrect ? (<i className="far fa-check-circle"></i> ) : (<i className="far fa-times-circle"></i>) }</th>
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
