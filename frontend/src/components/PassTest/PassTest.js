import React, { Component } from 'react'
import AuthContext from '../../context/AuthContext'

import Spinner from '../Spinner/Spinner'

import './css/style.css'
import { convertTimeShort } from '../../middleware/convertTime'
import { getHeaders } from '../../middleware/authMiddleware'
import QuestionCard from './QuestionCard'
import ConfirmModal from '../reusableComponents/ConfirmModal/ConfirmModal'

export default class PassTest extends Component {
    state = {
        isLoading: true,
        test: [],
        answers: [],
        answeredQuestions: 0,
        isSubmitted: false,
        isTimeUp: false,
        time: null,
        currentQuestion: 0,
        showModal: false
    }

    static contextType = AuthContext;

    componentDidMount() {
        const testId = this.props.match.params.testId;

        fetch(`${ this.context.proxy }/api/tests/testInfo/${ testId }`, {
            headers: {
                ...getHeaders()
            }
        })
            .then(res => res.json())
            .then(res => {
                let answers = [];
                for (let i = 0; i < res.questions.length; i++) 
                    answers[i] = [];
                this.setState({
                    isLoading: false,
                    answers,
                    test: res
                })

                if (res.timeLimit) {
                    const { timeLimit } = res;
                    let time = timeLimit;
                    setInterval(() => {
                        time = Math.max(time - 1, 0);
                        let { isTimeUp } = this.state;
                        if (!isTimeUp && time <= 0) {
                            isTimeUp = true;
                            let els = document.querySelectorAll("input[type='radio']");
                            els.forEach(el => {
                                el.setAttribute('onChange', 'return false');
                                el.setAttribute('onClick', 'return false');
                            })
                        }
                        this.setState({
                            ...this.state,
                            isTimeUp,
                            time
                        });
                        
                    }, 1000)
                } else {
                    let time = 0;
                    setInterval(() => {
                        time++;
                        this.setState({
                            ...this.state,
                            time
                        })
                    }, 1000)
                }

                
            })
    }

    handleSelect(index, answerId) {
        let { answers, answeredQuestions, isTimeUp, test } = this.state;
        
        if (isTimeUp) 
            return;
        else {
            if (!answers[index]) {
                answeredQuestions++;
            }
            let currentAnswer = answers[index];
            let currentQuestion = test.questions[index];

            if (currentQuestion.questionType === 'singleChoice') 
                answers[index] = [answerId.toString()];
            else {
                let foundIndex = -1;
                currentAnswer.forEach((ansId1, inx) => {
                    if (ansId1 === answerId.toString()) 
                        foundIndex = inx;
                })
                if (foundIndex === -1) 
                    currentAnswer.push(answerId.toString());
                else 
                    currentAnswer.splice(foundIndex, 1);
                currentAnswer.sort();
                answers[index] = currentAnswer;
            }

            this.setState({
                ...this.state,
                answers,
                answeredQuestions
            }, () => console.log(this.state) )
        }
        
    }

    finishTest() {
        // e.preventDefault();
        let points = 0;
        let results = [];
        let { answers, test, isSubmitted, time } = this.state;

        if (test.timeLimit) {
            time = test.timeLimit - time;
        }

        if (isSubmitted) 
            return;
        
        this.setState({
            ...this.state,
            isSubmitted: true
        })
        

        test.questions.map((ques, index) => {
            let isCorrect = true;
            if (ques.correctAnswerId.length !== answers[index].length) 
                isCorrect = false;
            else {
                for (let i = 0; i < ques.correctAnswerId.length; i++) 
                    if (ques.correctAnswerId[i] !== answers[index][i]) {
                        isCorrect = false;
                        break;
                    }
            }
            if (isCorrect) {
                points++;
                results.push(true);
            } else {
                results.push(false);
            }
            return ques;
        })
        const query = {
            "userId": this.context.userId,
            "points": points,
            "time": time,
            "answers": results,
            "title": test.title,
            "maxPoints": test.questions.length,
            "date": Date.now(),
            "answersLetters": answers
        }
        fetch(`${ this.context.proxy }/api/tests/saveResult/${ test._id }`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(query)
        })
            .then(res =>  res.json())
            .then((res) => {
                ('result saved!');
                this.context.user = res.user;
                // window.location.href = `/app/testInfo/${ test._id }`
            })
    }

    changeQuestion(choice) {
        let { currentQuestion, test } = this.state;

        if ((!currentQuestion && choice === -1) || (currentQuestion === test.questions.length && choice === 1)) 
            return;

        currentQuestion += choice;

        this.setState({
            ...this.state,
            currentQuestion
        })
        (currentQuestion)
    } 

    moveToQuestion(index) {
        let { currentQuestion } = this.state;

        currentQuestion = index;

        this.setState({
            ...this.state,
            currentQuestion
        })
    }

    toggleModal(choice) {
        const { showModal } = this.state;

        // (toggleModal)

        if (!choice) {
            this.setState({
                ...this.state,
                showModal: !showModal
            })
        } else {
            this.finishTest();
        }
    }

    render() {
        const { isLoading, test, answeredQuestions, time, answers, currentQuestion, showModal } = this.state;
        const { questions } = test;

        const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

        if (isLoading) return (
            <Spinner />
        )

        return (
            <>
                {
                    showModal && (
                        <ConfirmModal 
                            message="Are you sure you want to finish the test?" 
                            setModalChoice={ (choice) => this.toggleModal(choice) } 
                            positiveChoice="Yes"
                            negativeChoice="No"    
                         />
                    )
                }
                {
                    <QuestionCard 
                        answers={ answers } 
                        question={ questions[currentQuestion] }
                        handleSelect={ (index, ansId) => this.handleSelect(index, ansId) }
                        index={ currentQuestion }
                        changeQuestion={  (choice) => this.changeQuestion(choice) }
                        questionsNum={ test.questions.length }
                        finishTest={ () => this.toggleModal(false) }
                        moveToQuestion={ (index) => this.moveToQuestion(index) }
                        testTitle={ test.title } 
                        time={ time }
                    />
                }
            </>
        )
    }
}
