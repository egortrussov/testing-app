import React, { Component } from 'react'

export default class CreateTestForm extends Component {
    state = {
        questionNumber: 1,
        questions: [{
            title: '',
            answers: [{
                text: '',
                answerId: ''
            }, {
                text: '',
                answerId: ''
            }],
            currectAnswerId: '1'
        }],
        title: '',
        description: '',
        subject: '',
        isProtected: false,
        accessKey: ''
    }

    handleAddAnswer(quesId) {
        const { questions } = this.state;        
        if (questions[quesId].answers.length === 6) return;
        questions[quesId].answers.push({
            text: '',
            answerId: ''
        })
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
                answerId: ''
            }, {
                text: '',
                answerId: ''
            }],
            currectAnswerId: '1'
        }) 
        this.setState({
            ...this.state,
            questions
        })
    }

    setQuestionTitle(e, index) {
        let { questions } = this.state;
        questions[index].title = e.target.value;
        this.setState({
            ...this.state,
            questions
        });
    }

    setQuestionTitle(e, index, inx) {
        let { questions } = this.state;
        questions[index].answers[inx].text = e.target.value;
        this.setState({
            ...this.state,
            questions
        })
    }

    setTestTitle(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    setTestDescription(e) {
        this.setState({
            ...this.state,
            desctiption: e.target.value
        })
    }

    setTestSubject(e) {
        this.setState({
            ...this.state,
            subject: e.target.value
        })
    }

    setProtectedState(e) {
        this.setState({
            ...this.state,
            isProtected: !this.state.isProtected,
            accessKey: ''
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
                        <input onChange={ (e) => this.setTestTitle(e) } type="text" name="title" />
                    </div>
                    <div className="info-group">
                        <label htmlFor="subject">Subject: </label>
                        <input onChange={ (e) => this.setTestSubject(e) } type="text" name="subject" />
                    </div>
                    <div className="info-group">
                        <label htmlFor="description">Description: </label>
                        <textarea onChange={ (e) => this.setTestDescription(e) } name="description" name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="info-group">
                        <input onChange={ this.setProtectedState.bind(this) } type="checkbox" name="isProtected" />
                        <label htmlFor="isProtected" name="isProtected">Protected</label>
                    </div>
                    { isProtected && (
                        <div className="info-group">
                            <label htmlFor="key">Secret key: </label>
                            <input type="text" name="key" />
                        </div>
                    ) }
                    
                </div>
                <div className="questions">
                    { questions.map((ques, index) => {
                        return (
                            <div className="question-card">
                                <label className="title"><span>{ index + 1 }.</span> Title: </label>
                                <input type="text" onChange={ (e) => this.setQuestionTitle(e, index) } />
                                <div className="answers">
                                    { ques.answers.map((ans, inx) => {
                                        return (
                                            <div className="ans-card">
                                                <span className="ans-letter">{ letters[inx] }) </span>
                                                <input onChange={ (e) => this.setAnswerText(e, index, inx) } type="text" value={ ans.text } />
                                            </div>
                                        )
                                    }) }
                                    <button onClick={ this.handleAddAnswer.bind(this, index) } className="btn-secondary">+</button>
                                </div>
                            </div>
                        )
                    }) }
                    <button onClick={ this.handleAddQuestion.bind(this) } className="btn-secondary">
                        New question
                    </button>
                </div>
            </div>
        )
    }
}
