import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import TestsContext from '../../context/TestsContext'
import Spinner from '../Spinner/Spinner';

import { formatDate } from '../../middleware/dateFormat'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default class CreateTest extends Component {
    state = {
        createdTests: [],
        isLoading: true
    }

    static contextType = TestsContext;

    componentDidMount() {
        if (!this.context.userId) 
            window.location.href = '/app/login';
        fetch(`${ this.context.proxy }/api/tests/createdTests/${ this.context.userId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                
                this.setState({
                    createdTests: res,
                    isLoading: false
                })
            })
    }
    
    render() {
        const { createdTests, isLoading } = this.state;

        if (isLoading) return (
            <Spinner />
        )

        return (
            <div>
                <h1 className="heading">
                    Currently, you have { createdTests.length } created tests
                </h1>
                <Link to="/app/createTestForm" className="btn btn-cta">
                    New test
                </Link>
                <div className="tests-container">
                    { createdTests.map(test => {
                        const linkToTest = `/app/testInfo/${ test._id }`

                        return (
                            <Link to={ linkToTest }>
                                <div class="test-card">
                                    <h3 class="test-card__title">
                                        { test.title }
                                    </h3>
                                    <h4 class="test-card__subject">
                                        { test.subject }
                                    </h4>
                                    <div class="test-card__btns">
                                        <div class="btns-btn left"> <FontAwesomeIcon className="icon" icon={ faThumbsUp } /> <span>0</span> </div>
                                        <div class="btns-btn right"><FontAwesomeIcon className="icon" icon={ faUser } /> <span>{ test.results.length }</span> </div>
                                    </div>
                                    <h4 class="test-card__date">
                                        { formatDate(test.createdAt) }
                                    </h4>
                                </div>
                            </Link>
                        )
                    }) }
                </div>
            </div>
        )
    }
}
