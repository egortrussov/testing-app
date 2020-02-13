import React, { Component } from 'react'

import TestsContext from '../../context/TestsContext'

import './css/style.css'

export default class CreateTestForm extends Component {
    state = {
        questions: [{
            title: '',
            answers: [{
                text: '',
                answerId: '1'
            }, {
                text: '',
                answerId: '2'
            }],
            correctAnswerId: '1'
        }],
        title: '',
        description: '',
        subject: '',
        isProtected: false,
        accessKey: '',
        creator: this.context.userId
    }

    static contextType = TestsContext;

    handleAddAnswer(quesId) {
        const { questions } = this.state;        
        let len = questions[quesId].answers.length;
        console.log(len.toString());
        
        if (questions[quesId].answers.length === 6) return;
        questions[quesId].answers.push({
            text: '',
            answerId: (len + 1).toString()
        })
        console.log(questions[quesId].answers);
        
        this.setState({
            ...this.state,
            questions
        })
    }

    handleAddQuestion() {
        const { questions } = this.state;
        if (questions.length === 20) return;
        questions.push({
            title: '',
            answers: [{
                text: '',
                answerId: '1'
            }, {
                text: '',
                answerId: '2'
            }],
            correctAnswerId: '1'
        }) 
        this.setState({
            ...this.state,
            questions
        })
    }

    setQuestionTitle(e, index) {
        let { questions } = this.state;
        questions[index].title = e.target.innerText;
        this.setState({
            ...this.state,
            questions
        });
    }

    setAnswerText(e, index, inx) {
        console.log(e.target.innerText);
        
        let { questions } = this.state;
        console.log(questions[index].answers, inx);
        questions[index].answers[inx].text = e.target.innerText;
        this.setState({
            ...this.state,
            questions
        })
    }

    setTestTitle(e) {
        this.setState({
            ...this.state,
            title: e.target.innerText
        })
    }

    setTestDescription(e) {        
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }

    setTestSubject(e) {
        this.setState({
            ...this.state,
            subject: e.target.innerText
        }, () => console.log(this.state.subject))
    }

    setProtectedState(e) {
        this.setState({
            ...this.state,
            isProtected: !this.state.isProtected,
            accessKey: ''
        })
    }

    setAccessKey(e) {
        this.setState({
            ...this.state,
            accessKey: e.target.innerText
        })
    }

    setCorrectAnswerId(quesIndex, ansId) {
        let { questions } = this.state;
        questions[quesIndex].correctAnswerId = ansId;
        console.log(ansId);
        
        this.setState({
            ...this.state,
            questions
        })
    }

    handleAddTest() {
        if (!this.context.userId) 
            window.location.href = '/app/login'
        
        fetch('https://testing-app-easytest.herokuapp.com/api/tests/createTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                window.location.href = '/app/allTests'
            })
    }

    deleteAnswer(quesId, ansId) {
        let { questions } = this.state;
        if (questions[quesId].answers.length <= 2) return;

        let inx = parseInt(ansId);
        let corrAnswer = questions[quesId].correctAnswerId;
        if (corrAnswer.toString() === (ansId + 1).toString()) {
            if (ansId === 0) {
                questions[quesId].correctAnswerId = '1';
            } else {
                console.log('fff');
                
                questions[quesId].correctAnswerId = (ansId).toString();
            }
        } 
        for (let i = inx; i < questions[quesId].answers.length; i++) {
            questions[quesId].answers[i].answerId = (parseInt(questions[quesId].answers[i].answerId) - 1).toString();
            if (i !== inx)
                document.getElementById(`_${ quesId }-${ i - 1 }`).innerText = questions[quesId].answers[i].text;
        }  
        console.log(ansId);
        
        questions[quesId].answers.splice(ansId, 1);

        console.log(questions[quesId].answers);
        

        this.setState({
            ...this.state,
            questions
        })
    }

    deleteQuestion(quesId) {
        let { questions } = this.state;
        if (questions.length === 1) return;
        
        questions.splice(quesId, 1);
        this.setState({
            ...this.state,
            questions
        })
    }

    render() {
        const { questions, isProtected } = this.state;

        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

        return (
            <div>
                <h1 className="heading">
                    Create test 
                </h1>
                <div className="test-basic-info">
                    <div className="info-group">
                        <label htmlFor="title">Test name: </label>
                        <span className="field" contenteditable="true" onInput={ (e) => this.setTestTitle(e) } type="text" name="title"> </span>
                    </div>
                    <div className="info-group">
                        <label htmlFor="subject">Subject: </label>
                        <span className="field" contenteditable="true" onInput={ (e) => this.setTestSubject(e) } type="text" name="subject"> </span>
                    </div>
                    <div className="info-group">
                        <label htmlFor="description">Description: </label>
                        <textarea className="" onChange={ (e) => this.setTestDescription(e) } name="description" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="info-group-checkbox">
                        <input onChange={ this.setProtectedState.bind(this) } type="checkbox" name="isProtected" />
                        <label htmlFor="isProtected" name="isProtected">Protected</label>
                    </div>
                    { isProtected && (
                        <div className="info-group">
                            <label htmlFor="key">Secret key: </label>
                            <span class="field" contenteditable="true" onInput={ (e) => this.setAccessKey(e) } name="key" > </span>
                        </div>
                    ) }
                    
                </div>
                <div className="questions">
                    { questions.map((ques, index) => {
                        return (
                            <div className="question-card">
                                <button onClick={ () => this.deleteQuestion(index) } className="btn-delete"><span>&times;</span></button>
                                <label className="title"><span>{ index + 1 }.</span> </label>
                                <span className="input" contenteditable="true" type="text" onInput={ (e) => this.setQuestionTitle(e, index) } >Title</span>
                                <div className="answers">
                                    { ques.answers.map((ans, inx) => {
                                        return (
                                            <div className="ans-card">
                                                <button onClick={ () => this.deleteAnswer(index, inx) } className="btn-delete"><span>&times;</span></button>
                                                <input type="radio" id={ `${index}-${inx}` } name={ index } title="Mark as correct" onChange={ () => this.setCorrectAnswerId(index, ans.answerId) } checked={ ques.correctAnswerId === ans.answerId } />
                                                <label htmlFor={ `${index}-${inx}` }></label>
                                                <span className="ans-letter">{ letters[inx] }) </span>
                                                <span id={ `_${ index }-${ inx }` } className="input" contenteditable="true" onInput={ (e) => this.setAnswerText(e, index, inx) } type="text"></span>
                                                
                                                
                                            </div>
                                        )
                                    }) }
                                    <button onClick={ this.handleAddAnswer.bind(this, index) } className="add-question"><span>+</span></button>
                                </div>
                            </div>
                        )
                    }) }
                    <button onClick={ this.handleAddQuestion.bind(this) } className="new-question btn-secondary">
                        New question
                    </button>
                </div>
                <button onClick={ this.handleAddTest.bind(this) } className="btn btn-cta">Create test!</button>
            </div>
        )
    }
}
