import React, { Component } from 'react'
import Dropdown from 'react-dropdown';
import Input from '../reusableComponents/inputField/Input';

export default class CreateQuestionCard extends Component {

    render() {
        const { index, question, questionTypesToDisplay, changeQuestionType, letters, addAnswer, deleteAnswer, setAnswerText, setCorrectAnswerId, setQuestionTitle } = this.props;

        let choiceInx = 0;
        if (question.questionType === 'multipleChoice') 
            choiceInx = 1;
        console.log(choiceInx)

        return (
            <div key={ index } className="question-container"> 

                <Dropdown options={ questionTypesToDisplay } onChange={ (option) => changeQuestionType(index, option) } value={ questionTypesToDisplay[choiceInx]} placeholder="Select question type" />

                
                <h3 className="question-container__title">
                    <div className="delete-question-btn">
                        <span>&times;</span>
                    </div>
                    <span>{ index + 1 }.</span>  <Input type="text" isMini={ true } onChange={ (e) => setQuestionTitle(e, index) } name="questionTitle" value={ question.title } />
                </h3>
                <div className="question-container__answers">
                    { question.answers.map((ans, inx) => {
                        let extraClassName = '';
                        
                        if (question.correctAnswerId.toString() === (inx + 1).toString()) 
                            extraClassName = 'selected';

                        return (
                            <div key={ `${ inx }-${ index }` } className={ "answer-block " + extraClassName }>
                                <div className="answer-block__letter" onClick={ () => setCorrectAnswerId(index, ans.answerId) }><span>{ letters[inx] }</span></div>
                                <div className="answer-block__text">
                                    <input autoComplete="off" id={ `_${ index }-${ inx }` } type="text" onChange={(e) => setAnswerText(e, index, inx) } value={ ans.text } />
                                    <button className="btn-delete" onClick={ () => deleteAnswer(index, inx) }>
                                        <span>&times;</span>
                                    </button>
                                </div>
                            </div>
                        )
                    }) }
                    <button onClick={ () => addAnswer(index) } className="add-question"><span>+</span></button>
                </div>
            </div>
        )
    }
}
