import React, { Component } from 'react'
import AuthContext from '../../context/AuthContext'

import Spinner from '../Spinner/Spinner'

import './css/style.css'
import { convertTimeShort } from '../../middleware/convertTime'
import { getHeaders } from '../../middleware/authMiddleware'

export default class PassTest extends Component {
    state = {
        isLoading: true,
        test: [],
        answers: [],
        answeredQuestions: 0,
        isSubmitted: false,
        isTimeUp: false,
        time: null
    }

    static contextType = AuthContext;

    componentDidMount() {
        const testId = this.props.match.params.testId;

        fetch(`${ this.context.proxy }/api/tests/testInfo/${ testId }`, {
            headers: {
                ...getHeaders()
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                let answers = [];
                for (let i = 0; i < res.questions.length; i++) 
                    answers[i] = 0;
                this.setState({
                    isLoading: false,
                    answers,
                    test: res
                })

                if (res.timeLimit) {
                    const { timeLimit } = res;
                    let time = timeLimit;
                    setInterval(() => {
                        time = Math.max(time - 1, 0);
                        let { isTimeUp } = this.state;
                        if (!isTimeUp && time <= 0) {
                            isTimeUp = true;
                            let els = document.querySelectorAll("input[type='radio']");
                            els.forEach(el => {
                                el.setAttribute('onChange', 'return false');
                                el.setAttribute('onClick', 'return false');
                            })
                        }
                        this.setState({
                            ...this.state,
                            isTimeUp,
                            time
                        });
                        
                    }, 1000)
                } else {
                    let time = 0;
                    setInterval(() => {
                        time++;
                        this.setState({
                            ...this.state,
                            time
                        })
                    }, 1000)
                }

                
            })
    }

    handleSelect(index, answerId) {
        let { answers, answeredQuestions, isTimeUp } = this.state;
        
        if (isTimeUp) 
            return;
        else {
            if (!answers[index]) {
                answeredQuestions++;
            }
            answers[index] = answerId;
            this.setState({
                ...this.state,
                answers,
                answeredQuestions
            }, () => console.log(this.state) )
        }
        
    }

    finishTest(e) {
        e.preventDefault();
        let points = 0;
        let results = [];
        let { answers, test, isSubmitted, time } = this.state;

        if (test.timeLimit) {
            time = test.timeLimit - time;
        }

        if (isSubmitted) 
            return;
        
        this.setState({
            ...this.state,
            isSubmitted: true
        })

        console.log('finish!');
        

        test.questions.map((ques, index) => {
            if (ques.correctAnswerId === answers[index]) {
                points++;
                results.push(true);
            } else {
                results.push(false);
            }
            return ques;
        })
        const query = {
            "userId": this.context.userId,
            "points": points,
            "time": time,
            "answers": results,
            "title": test.title,
            "maxPoints": test.questions.length,
            "date": Date.now(),
            "answersLetters": answers
        }
        fetch(`${ this.context.proxy }/api/tests/saveResult/${ test._id }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        })
            .then(() => {
                console.log('result saved!');
                window.location.href = `/app/testInfo/${ test._id }`
            })
    }

    render() {
        const { isLoading, test, answeredQuestions, time, answers } = this.state;
        const { questions } = test;

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

        if (isLoading) return (
            <Spinner />
        )

        return (
            <>
                <div className="info-block">
                    <div>
                        { test.timeLimit ? (
                            <span>Time left: { convertTimeShort(time) }</span>
                        ) : (
                            <span>Time passed: { convertTimeShort(time) }</span>
                        ) } 
                    </div>
                    <div>
                        Answered questions: { answeredQuestions } / { questions.length }
                    </div>
                </div>
                <form className="test-form" onSubmit={ e => this.finishTest(e) }>
                    <h1 className="heading">
                        Pass test '{ test.title }'
                    </h1>
                    <div className="test-questions">
                        { questions.map((ques, index) => {
                            return (
                                <div className="question-container">
                                    <h3 class="question-container__title">
                                        { index + 1 }.  { ques.title }
                                    </h3>
                                    <div className="question-container__answers">
                                        { ques.answers.map((ans, inx) => {
                                            let extraClassName = '';
                                            
                                            if (answers[index].toString() === (inx + 1).toString()) 
                                                extraClassName = 'selected';

                                            return (
                                                <div className={ "answer-block " + extraClassName } onClick={ this.handleSelect.bind(this, index, ans.answerId) }>
                                                    <div className="answer-block__letter"><span>{ letters[inx] }</span></div>
                                                    <div className="answer-block__text">
                                                        <span>{ ans.text }</span>
                                                    </div>
                                                </div>
                                            )
                                        }) }
                                        
                                    </div>
                                </div>
                            )
                        }) }
                    </div>
                    <input type="submit" className="btn btn-cta" value="Finish" />
                </form>
            </>
        )
    }
}
