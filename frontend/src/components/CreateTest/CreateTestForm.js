import React, { Component } from 'react'

import Spinner from '../Spinner/Spinner'

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
        creator: this.context.userId,
        timeErrorMsg: '',
        isLoading: false,
        errors: [],
        maxAttempts: null,
        isLimitedAttempts: false,
        isLimitedTime: false,
        timeLimit: null
    }

    static contextType = TestsContext;

    componentDidMount() {
                
        var x, i, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName('custom-select');
        console.log(x);

        let timeValues = [5 * 60, 10 * 60, 20 * 60, 30 * 60, 1 * 60 * 60, 1.5 * 60 * 60];

        const setst = (j) => {
            console.log("hhhh");
            
            this.setState({
                ...this.state,
                timeLimit: timeValues[j - 1]
            }, () => console.log(this.state))
        }

        for (i = 0; i < x.length; i++) {
            selElmnt = x[i].getElementsByTagName('select')[0];
            /* For each element, create a new DIV that will act as the selected item: */
            a = document.createElement('DIV');
            a.setAttribute('class', 'select-selected');
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /* For each element, create a new DIV that will contain the option list: */
            b = document.createElement('DIV');
            b.setAttribute('class', 'select-items select-hide');
            for (let j = 1; j < selElmnt.length; j++) {
                /* For each option in the original select element,
            create a new DIV that will act as an option item: */
                c = document.createElement('DIV');
                c.innerHTML = selElmnt.options[j].innerHTML;
                console.log(selElmnt);
                
                c.addEventListener('click', function(e) {
                    /* When an item is clicked, update the original select box,
                and the selected item: */
                    
                    var y, i, k, s, h;
                    s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                    h = this.parentNode.previousSibling;
                    console.log(timeValues[j - 1]);
                    // this.setState({
                    //     ...this.state,
                    //     timeLimit: timeValues[j - 1]
                    // })
                    
                    
                    for (i = 0; i < s.length; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;

                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName(
                                'same-as-selected'
                            );
                            for (k = 0; k < y.length; k++) {
                                y[k].removeAttribute('class');
                            }
                            this.setAttribute('class', 'same-as-selected');
                            break;
                        }
                    }
                    h.click();

                    setst(j);
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener('click', function(e) {
                /* When the select box is clicked, close any other select boxes,
            and open/close the current select box: */
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle('select-hide');
                this.classList.toggle('select-arrow-active');
            });
        }

        function closeAllSelect(elmnt) {
            /* A function that will close all select boxes in the document,
        except the current select box: */
            var x,
                y,
                i,
                arrNo = [];
            x = document.getElementsByClassName('select-items');
            y = document.getElementsByClassName('select-selected');
            for (i = 0; i < y.length; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i);
                } else {
                    y[i].classList.remove('select-arrow-active');
                }
            }
            for (i = 0; i < x.length; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add('select-hide');
                }
            }
        }

        document.addEventListener('click', closeAllSelect);

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

    setAttemptsState(e) {
        this.setState({
            ...this.state,
            isLimitedAttempts: !this.state.isLimitedAttempts,
            maxAttempts: null
        })
    }

    setTimeLimitState(e) {
        this.setState({
            ...this.state,
            isLimitedTime: !this.state.isLimitedTime,
            timeLimit: null
        })
    }

    setAccessKey(e) {
        this.setState({
            ...this.state,
            accessKey: e.target.innerText
        })
    }

    setAttemptsNumber(e) {
        this.setState({
            ...this.state,
            maxAttempts: parseInt(e.target.value)
        })
        console.log(this.state);
        
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
        this.setState({
            ...this.state,
            isLoading: true
        })

        let newTest = this.state;
        
        console.log(this.state);
        
        let errors = [];

        if (!newTest.title) 
            errors['title'] = 'The test must have a title'
        if (!newTest.subject) 
            errors['subject'] = 'The test must have a subject'
        newTest.questions.map(ques => {
            if (!ques.title) 
                errors['questions'] = 'Questions must not be empty';
            ques.answers.map(ans => {
                if (!ans.text) 
                    errors['answers'] = 'Answers must not be empty';
            })
        })

        if (errors['title'] || errors['subject'] || errors['questions'] || errors['answers']) {
            this.setState({
                ...this.state,
                errors
            });
            return;
        }

        if (!this.context.userId) 
            window.location.href = '/app/login'
        
        fetch(`${ this.context.proxy }/api/tests/createTest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': this.context.token
            },
            body: JSON.stringify(this.state)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                if (!res.success) {
                    if (res.isTimeErr) {
                        this.setState({
                            ...this.state,
                            timeErrorMsg: 'You cannot create more than 1 test in 5 minutes!',
                            isLoading: false
                        })
                    }
                } else {
                    window.location.href = '/app/allTests'
                }
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
        const { questions, isProtected, timeErrorMsg, isLoading, title, errors, isLimitedAttempts, isLimitedTime } = this.state;

        console.log(isLimitedTime);
        
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

        return (
            <div>
                <h1 className="heading">
                    Create test 
                </h1>
                <div className="test-basic-info">
                    <div className="info-group">
                        <label htmlFor="title">Test name: </label>
                        <span value={ title } className="field" contenteditable="true" onInput={ (e) => this.setTestTitle(e) } type="text" name="title"></span>
                        <span className="error-input">{ errors['title'] }</span>
                    </div>
                    <div className="info-group">
                        <label htmlFor="subject">Subject: </label>
                        <span className="field" contenteditable="true" onInput={ (e) => this.setTestSubject(e) } type="text" name="subject"> </span>
                        <span className="error-input">{ errors['subject'] }</span>
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
                    <div className="info-group-checkbox">
                        <input onChange={ this.setAttemptsState.bind(this) } type="checkbox" name="isLimitedAttempts" />
                        <label htmlFor="isLimitedAttempts" name="isLimitedAttempts">Limited attempts</label>
                    </div>
                    { isLimitedAttempts && (
                        <div className="info-group">
                            <label htmlFor="key">Maximum attempts: </label>
                            <input type="number" min="1" max="10" onChange={ (e) => this.setAttemptsNumber(e) } name="key"  />
                        </div>
                    ) }
                    <div className="info-group-checkbox">
                        <input onChange={ this.setTimeLimitState.bind(this) } type="checkbox" name="isLimitedTime" />
                        <label htmlFor="isLimitedTime" name="isLimitedTime">Limited time</label>
                    </div>
                    { isLimitedTime ? (
                        <div className="custom-select" style={{ width: 300 + 'px' }}>
                            <select>
                                <option value="0">Select time limit:</option>
                                <option value="1">5 minutes</option>
                                <option value="2">10 minutes</option>
                                <option value="3">20 minuted</option>
                                <option value="4">30 minutes</option>
                                <option value="5">1 hour</option>
                                <option value="6">1.5 hours</option>
                            </select>
                        </div>
                    ) : (
                        <div className="custom-select" style={{ width: 300 + 'px', visibility: 'hidden' }}>
                            <select>
                                <option value="0">Select time limit:</option>
                                <option value="1">5 minutes</option>
                                <option value="2">10 minutes</option>
                                <option value="3">20 minuted</option>
                                <option value="4">30 minutes</option>
                                <option value="5">1 hour</option>
                                <option value="6">1.5 hours</option>
                            </select>
                        </div>
                    ) }
                    
                </div>
                <div className="questions">
                    { questions.map((ques, index) => {
                        return (
                            <div className="question-card">
                                <button onClick={ () => this.deleteQuestion(index) } className="btn-delete"><span>&times;</span></button>
                                <label className="title"><span>{ index + 1 }.</span> </label>
                                <span className="input" contenteditable="true" type="text" onInput={ (e) => this.setQuestionTitle(e, index) } ></span>
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
                { timeErrorMsg && (
                    <span className="error-msg">
                        { timeErrorMsg }
                    </span>
                ) }

                { errors['questions'] && (
                    <span className="error-msg">
                        { errors['questions'] }
                    </span>
                ) }
                { errors['answers'] && (
                    <span className="error-msg">
                        { errors['answers'] }
                    </span>
                ) }

                <button onClick={ this.handleAddTest.bind(this) } className="btn btn-cta">Create test!</button>
                
                { isLoading && <Spinner size="sm" /> }
            </div>
        )
    }
}
