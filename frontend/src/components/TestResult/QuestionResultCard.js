import React, { Component } from 'react'

export default class QuestionResultCard extends Component {
    render() {
        const { question, ans, extraClassName, inx, answers } = this.props;

        console.log(answers, question)

        if (question.questionType === 'singleChoice')
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
        if (question.questionType === 'multipleChoice') 
            return (
                <div className="question-ans">
                    <h3>{ inx + 1 }. { question.title }</h3>
                    { ans ===  0 ? (
                        <span className={ "ans-text " + extraClassName}>
                            Your answers: -
                        </span>
                    ) : (
                        <span className={ "ans-text " + extraClassName}>
                            Your answers: 
                            <div className="answers-container">
                                {
                                    answers.map(answer => (
                                        <div className="answer">
                                            { question.answers[+answer - 1].answerId }) { question.answers[+answer - 1].text }
                                        </div>
                                    ))
                                }
                            </div>
                        </span>
                    ) } 
                    <span className="ans-text">
                        Correct answers: 
                        <div className="answers-container">
                            {
                                question.correctAnswerId.map(correctAnswerId => {
                                    let foundAnswer = question.answers[+correctAnswerId - 1];
                                    return (
                                        <div className="answer">
                                            { foundAnswer.answerId }) { foundAnswer.text }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </span>                           
                </div>
            )
    }
}
