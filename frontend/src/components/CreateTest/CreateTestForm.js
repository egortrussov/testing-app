import React, { Component } from 'react'

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
        accessKey: ''
    }

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

    setAnswerText(e, index, inx) {
        let { questions } = this.state;
        console.log(questions[index].answers, inx);
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
            description: e.target.value
        })
    }

    setTestSubject(e) {
        this.setState({
            ...this.state,
            subject: e.target.value
        }, () => console.log(this.state.subject))
    }

    setProtectedState(e) {
        this.setState({
            ...this.state,
            isProtected: !this.state.isProtected,
            accessKey: ''
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
        fetch('http://localhost:5000/api/tests/createTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
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
                                                <input type="radio" name={ index } title="Mark as correct" onChange={ () => this.setCorrectAnswerId(index, ans.answerId) } checked={ ques.correctAnswerId === ans.answerId } />
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
                <button onClick={ this.handleAddTest.bind(this) } className="btn btn-cta">Create test!</button>
            </div>
        )
    }
}
