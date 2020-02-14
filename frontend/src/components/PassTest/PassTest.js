import React, { Component } from 'react'
import TestsContext from '../../context/TestsContext'

import Spinner from '../Spinner/Spinner'

import './css/style.css'

export default class PassTest extends Component {
    state = {
        isLoading: true,
        test: [],
        answers: [],
        answeredQuestions: 0,
    }

    static contextType = TestsContext;

    componentDidMount() {
        const testId = this.props.match.params.testId;
        fetch(`${ this.context.proxy }/api/tests/testInfo/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    test: res
                })
            })
    }

    handleSelect(index, answerId) {
        console.log(index, answerId);
        let { answers, answeredQuestions } = this.state;
        if (typeof(answers[index]) === 'undefined') {
            answeredQuestions++;
        }
        answers[index] = answerId;
        this.setState({
            ...this.state,
            answers,
            answeredQuestions
        }, () => console.log(this.state) )
    }

    finishTest(e) {
        e.preventDefault();
        let points = 0;
        let results = [];
        const { answers, test } = this.state;
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
        const { isLoading, test } = this.state;
        const { questions } = test;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <form className="test-form" onSubmit={ e => this.finishTest(e) }>
                <h1 className="heading">
                    Pass test '{ test.title }'
                </h1>
                <div className="test-questions">
                    { questions.map((ques, index) => {
                        return (
                            <div className="question-card">
                                <h3 className="question-title">
                                    { index + 1 }.  { ques.title }
                                </h3>
                                <div className="answers">
                                    { ques.answers.map(ans => {
                                        return (
                                            <div className="answer">
                                                <input onChange={ this.handleSelect.bind(this, index, ans.answerId) } id={ ans._id } type="radio" name={ index } />
                                                <label htmlFor={ ans._id }>{ ans.text }</label>
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
        )
    }
}
