import React, { Component } from 'react'

import Spinner from '../Spinner/Spinner'

export default class PassTest extends Component {
    state = {
        isLoading: true,
        test: [],
        answers: [],
    }

    componentDidMount() {
        const testId = this.props.match.params.testId;
        fetch(`http://localhost:5000/api/tests/testInfo/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    test: res
                })
            })
    }

    render() {
        const { isLoading, test } = this.state;
        const { questions } = test;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
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
                                                <input id={ ans._id } type="radio" name={ index } />
                                                <label htmlFor={ ans._id }>{ ans.text }</label>
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}
