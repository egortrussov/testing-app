import React, { Component } from 'react'

export default class QuestionNavbar extends Component {
    render() {
        const { questionsNum, moveToQuestion, answers, index } = this.props;

        let questionsButtons = [];

        for (let i = 0; i < questionsNum; i++) {
            let extraClassName = '';

            if (index === i) 
                extraClassName = 'current';
            else if (answers[i]) 
                extraClassName = 'answered'

            questionsButtons.push(
                <div onClick={ () => moveToQuestion(i) } className={`question-btn ${ extraClassName }`}>
                    <span>{ i + 1 }</span>
                </div>
            )
        }

        return (
            <>
                { questionsButtons }  
            </>
        )
    }
}
