import React, { Component } from 'react'

export default class QuestionCard extends Component {
    render() {
        const { answers, question, index, handleSelect, changeQuestion, questionsNum, finishTest } = this.props;

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

        return (
            <div className="question-container">
                <h3 class="question-container__title">
                    { index + 1 }.  { question.title }
                </h3>
                <div className="question-container__answers">
                    { question.answers.map((ans, inx) => {
                        let extraClassName = '';
                        
                        if (answers[index].toString() === (inx + 1).toString()) 
                            extraClassName = 'selected';

                        return (
                            <div className={ "answer-block " + extraClassName } onClick={ () => handleSelect(index, ans.answerId) }>
                                <div className="answer-block__letter"><span>{ letters[inx] }</span></div>
                                <div className="answer-block__text">
                                    <span>{ ans.text }</span>
                                </div>
                            </div>
                        )
                    }) }
                    
                </div>
                <div className="question-container__buttons">
                    <div className="buttons-left">
                        {
                            index ? <button onClick={ () => changeQuestion(-1) }>Previous question</button> : ''
                        }
                        {
                            index !== questionsNum - 1 ? <button onClick={ () => changeQuestion(1) }>Next question</button> : ''
                        }
                        
                    </div>
                    <div className="buttons-right">
                        <button onClick={ () => finishTest() } >Finish test</button>
                    </div>
                </div>
            </div>
        )
    }
}
