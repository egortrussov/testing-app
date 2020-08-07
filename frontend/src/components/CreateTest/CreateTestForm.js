import React, { Component } from 'react'
import ls from 'local-storage'
import Dropdown from 'react-dropdown'

import Spinner from '../Spinner/Spinner'
import Input from '../reusableComponents/inputField/Input'

import AuthContext from '../../context/AuthContext'

import './css/style.css'
import 'react-dropdown/style.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../reusableComponents/ConfirmModal/ConfirmModal'
import CreateQuestionCard from './CreateQuestionCard'

export default class CreateTestForm extends Component {
    state = {
        questionTypes: ['singleChoice', 'multipleChoice'],
        questions: [{
            questionType: 'singleChoice',
            title: '',
            answers: [{
                text: '',
                answerId: '1'
            }, {
                text: '',
                answerId: '2'
            }],
            correctAnswerId: ['1']
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
        timeLimit: null,
        answerToLoadTest: undefined,
        hasSavedTest: false
    }

    static contextType = AuthContext;

    componentDidMount() {
                
        var x, i, selElmnt, a, b, c;
        /* Look for any elements with the class "custom-select": */
        x = document.getElementsByClassName('custom-select');
        console.log(x);

        let savedTest = ls.get('savedTestToCreate');

        if (savedTest) {
            this.setState({
                ...this.state,
                hasSavedTest: true
            })
        }

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
                        if (s.options[i].innerHTML === this.innerHTML) {
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
                if (elmnt === y[i]) {
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
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })

    }

    handleAddQuestion() {
        const { questions } = this.state;
        if (questions.length === 20) return;
        questions.push({
            questionType: 'singleChoice',
            title: '',
            answers: [{
                text: '',
                answerId: '1'
            }, {
                text: '',
                answerId: '2'
            }],
            correctAnswerId: ['1']
        }) 
        this.setState({
            ...this.state,
            questions
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setQuestionTitle(e, index) {
        let { questions } = this.state;
        questions[index].title = e.target.value;
        this.setState({
            ...this.state,
            questions
        }, () => {
            ls.set('savedTestToCreate', this.state);
        });
    }

    setAnswerText(e, index, inx) {
        console.log(e.target.value);
        
        let { questions } = this.state;
        console.log(questions[index].answers, inx);
        questions[index].answers[inx].text = e.target.value;
        this.setState({
            ...this.state,
            questions
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setTestTitle(e) {
        this.setState({
            ...this.state,
            title: e.target.value
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setTestDescription(e) {        
        this.setState({
            ...this.state,
            description: e.target.value
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setTestSubject(e) {
        this.setState({
            ...this.state,
            subject: e.target.value
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setProtectedState(e) {
        this.setState({
            ...this.state,
            isProtected: !this.state.isProtected,
            accessKey: ''
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setAttemptsState(e) {
        this.setState({
            ...this.state,
            isLimitedAttempts: !this.state.isLimitedAttempts,
            maxAttempts: 1
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setTimeLimitState(e) {
        this.setState({
            ...this.state,
            isLimitedTime: !this.state.isLimitedTime,
            timeLimit: null
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setAccessKey(e) {
        this.setState({
            ...this.state,
            accessKey: e.target.value
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setAttemptsNumber(e) {
        this.setState({
            ...this.state,
            maxAttempts: parseInt(e.target.value)
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
        
    }

    changeAttemptsNumber(value) {
        let { maxAttempts } = this.state;

        if (value > 0) 
            maxAttempts = Math.min(maxAttempts + value, 10);
        else 
            maxAttempts = Math.max(maxAttempts + value, 1);

        this.setState({
            ...this.state,
            maxAttempts
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    setCorrectAnswerId(quesIndex, ansId) {
        let { questions } = this.state;
        
        let currQuestion = questions[quesIndex];

        if (currQuestion.questionType === 'singleChoice') 
            questions[quesIndex].correctAnswerId = [ansId];
        else {
            let index = -1;
            currQuestion.correctAnswerId.forEach((ansId1, inx) => {
                if (ansId1 === ansId) 
                    index = inx;
            })
            console.log(ansId, currQuestion.correctAnswerId)
            if (index === -1) 
                questions[quesIndex].correctAnswerId.push(ansId);
            else if (currQuestion.correctAnswerId.length > 1)
                questions[quesIndex].correctAnswerId.splice(index, 1);
        }
        
        this.setState({
            ...this.state,
            questions
        }, () => {
            ls.set('savedTestToCreate', this.state);
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
                return true;
            })
            return true;
        })

        if (errors['title'] || errors['subject'] || errors['questions'] || errors['answers']) {
            this.setState({
                ...this.state,
                errors
            });
            return;
        }

        let isErrors = false;

        if (newTest.title.length >= 30) {
            errors['title'] = 'Title must not be longer than 30 syllables';
            isErrors = true;
        }
        if (newTest.subject.length >= 18) {
            errors['title'] = 'Title subject not be longer than 18 syllables';
            isErrors = true;
        }
        if (newTest.description.length >= 400) {
            errors['title'] = 'Title description not be longer than 400 syllables';
            isErrors = true;
        }

        if (isErrors) {
            this.setState({
                ...this.state,
                errors
            })
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
                    ls.set('savedTestToCreate', null)
                    window.location.href = '/app/allTests'
                }
            })
    }

    setModalChoice(choice) {
        if (choice) {
            this.setState(ls.get('savedTestToCreate'), () => {
                console.log(this.state)
                this.setState({
                    ...this.state,
                    hasSavedTest: false
                })
            })
        } else {
            ls.set('savedTestToCreate', null);
            this.setState({
                ...this.state,
                hasSavedTest: false
            })
        }
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
                questions[quesId].correctAnswerId = (ansId).toString();
            }
        } 
        for (let i = inx; i < questions[quesId].answers.length; i++) {
            questions[quesId].answers[i].answerId = (parseInt(questions[quesId].answers[i].answerId) - 1).toString();
            if (i !== inx)
                document.getElementById(`_${ quesId }-${ i - 1 }`).value = questions[quesId].answers[i].text;
        }  
        console.log(+questions[quesId].correctAnswerId, questions[quesId].answers.length)
        if (+questions[quesId].correctAnswerId >= questions[quesId].answers.length) 
            questions[quesId].correctAnswerId =  (questions[quesId].answers.length - 1).toString();
        console.log(questions[quesId]);
         
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

    changeQuestionType(questionInx, option) {
        let { questions, questionTypes } = this.state;

        questions[questionInx].questionType = questionTypes[option.value];

        console.log(option, questions[questionInx].questionType)

        this.setState({
            ...this.state,
            questions
        }, () => {
            ls.set('savedTestToCreate', this.state);
        })
    }

    render() {
        const { questions, isProtected, timeErrorMsg, isLoading,  errors, isLimitedAttempts, isLimitedTime, maxAttempts, hasSavedTest, title, description, subject, accessKey, questionTypes } = this.state;
        
        const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        const questionTypesToDisplay = [
            { value: 0, label: 'Single choice' }, 
            { value: 1, label: 'Multiple choice' }
        ];

        return (
            <div>
                {hasSavedTest && (
                    <ConfirmModal
                        message="Load autosaved test?"
                        positiveChoice="Sure"
                        negativeChoice="No, delete it"
                        setModalChoice={(choice) => this.setModalChoice(choice)}
                    />
                )}

                <h1 className="heading">Create test</h1>
                <div className="test-basic-info">
                    <div className="info-group">
                        <label htmlFor="title">Test name: </label>
                        <Input
                            type="text"
                            onChange={(e) => this.setTestTitle(e)}
                            isMini={true}
                            name="title"
                            value={title}
                        />
                        <span className="error-input">{errors['title']}</span>
                    </div>
                    <div className="info-group">
                        <label htmlFor="subject">Subject: </label>
                        <Input
                            type="text"
                            onChange={(e) => this.setTestSubject(e)}
                            isMini={true}
                            name="title"
                            value={subject}
                        />
                        <span className="error-input">{errors['subject']}</span>
                    </div>
                    <div className="info-group">
                        <label htmlFor="description">Description: </label>
                        <textarea
                            className=""
                            onChange={(e) => this.setTestDescription(e)}
                            name="description"
                            id=""
                            cols="30"
                            rows="10"
                            value={description}></textarea>
                    </div>
                    <div className="info-group-checkbox">
                        <div className="pretty p-icon p-smooth p-thick p-curve">
                            {isProtected ? (
                                <input
                                    type="checkbox"
                                    checked
                                    onChange={this.setProtectedState.bind(this)}
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    onChange={this.setProtectedState.bind(this)}
                                />
                            )}
                            <div className="state p-success">
                                <i className="icon">
                                    <FontAwesomeIcon
                                        className="check-icon"
                                        icon={faCheck}
                                    />
                                </i>
                                <label>Protected</label>
                            </div>
                        </div>
                    </div>
                    {isProtected && (
                        <div className="info-group">
                            <label htmlFor="key">Secret key: </label>
                            <Input
                                onChange={(e) => this.setAccessKey(e)}
                                isMini={true}
                                name="accessKey"
                                type="text"
                                value={accessKey}
                            />
                        </div>
                    )}
                    <div className="info-group-checkbox">
                        <div className="pretty p-icon p-smooth p-thick p-curve">
                            {isLimitedAttempts ? (
                                <input
                                    type="checkbox"
                                    checked
                                    onChange={this.setAttemptsState.bind(this)}
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    onChange={this.setAttemptsState.bind(this)}
                                />
                            )}
                            <div className="state p-success">
                                <i className="icon">
                                    <FontAwesomeIcon
                                        className="check-icon"
                                        icon={faCheck}
                                    />
                                </i>
                                <label>Limited attempts</label>
                            </div>
                        </div>
                    </div>
                    {isLimitedAttempts && (
                        <div className="info-group">
                            <label htmlFor="key">Maximum attempts: </label>
                            <div className="btn-group">
                                <button
                                    className="increment-btn"
                                    onClick={() =>
                                        this.changeAttemptsNumber(-1)
                                    }>
                                    {' '}
                                    <span>-</span>{' '}
                                </button>
                                <span className="attempts-num">
                                    {maxAttempts}
                                </span>
                                <button
                                    className="increment-btn"
                                    onClick={() =>
                                        this.changeAttemptsNumber(1)
                                    }>
                                    {' '}
                                    <span>+</span>{' '}
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="info-group-checkbox">
                        <div className="pretty p-icon p-smooth p-thick p-curve">
                            {isLimitedTime ? (
                                <input
                                    type="checkbox"
                                    checked
                                    onChange={this.setTimeLimitState.bind(this)}
                                />
                            ) : (
                                <input
                                    type="checkbox"
                                    onChange={this.setTimeLimitState.bind(this)}
                                />
                            )}
                            <div className="state p-success">
                                <i className="icon">
                                    <FontAwesomeIcon
                                        className="check-icon"
                                        icon={faCheck}
                                    />
                                </i>
                                <label>Limited time</label>
                            </div>
                        </div>
                    </div>
                    {isLimitedTime ? (
                        <div
                            className="custom-select"
                            style={{ width: 300 + 'px' }}>
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
                        <div
                            className="custom-select"
                            style={{ width: 300 + 'px', visibility: 'hidden' }}>
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
                    )}
                </div>
                <div className="questions">
                    { questions.map((ques, index) => (
                        <CreateQuestionCard
                            question={ ques }
                            index={ index }
                            questionTypesToDisplay={ questionTypesToDisplay }
                            letters={ letters }
                            changeQuestionType={ (questionInx, option) =>
                                this.changeQuestionType(questionInx, option)
                            }
                            handleAddAnswer={ (index) => this.handleAddAnswer(index) }
                            setAnswerText={ (e, questionInx, answerInx) => this.setAnswerText(e, questionInx, answerInx) }
                            deleteAnswer={ (questionInx, answerInx) => this.deleteAnswer(questionInx, answerInx) }
                            setCorrectAnswerId={ (questionInx, ansId) => this.setCorrectAnswerId(questionInx, ansId) }
                            setQuestionTitle={ (e, index) => this.setQuestionTitle(e, index) }
                            addAnswer={ (questionInx) => this.handleAddAnswer(questionInx) }
                        />
                    ))}
                    <button
                        onClick={this.handleAddQuestion.bind(this)}
                        className="new-question btn-secondary">
                        New question
                    </button>
                </div>
                {timeErrorMsg && (
                    <span className="error-msg">{timeErrorMsg}</span>
                )}

                {errors['questions'] && (
                    <span className="error-msg">{errors['questions']}</span>
                )}
                {errors['answers'] && (
                    <span className="error-msg">{errors['answers']}</span>
                )}

                <button
                    onClick={this.handleAddTest.bind(this)}
                    className="btn btn-cta">
                    Create test!
                </button>

                {isLoading && <Spinner size="sm" />}
            </div>
        );
    }
}
