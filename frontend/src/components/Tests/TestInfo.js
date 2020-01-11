import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Spinner from '../Spinner/Spinner'

import './css/style.css'

export default class TestInfo extends Component {
    state = {
        isLoading: true,
        test: null,
        testResults: null,
        usernames: null
    }

    componentDidMount() {
        const testId = this.props.match.params.testId;
        
        fetch(`http://localhost:5000/api/tests/testInfo/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    test: res
                })
            })
        fetch(`http://localhost:5000/api/tests/testResults/${ testId }`)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    isLoading: false,
                    testResults: res.testResults,
                    usernames: res.usernames
                })
            })
    }
    

    render() {
        const { isLoading, test, testResults, usernames } = this.state;

        if (isLoading || test === null) return (
            <Spinner />
        )

        return (
            <div>
                <div className="page-top">
                    <Link to="/app/allTests">
                        <i className="fas fa-arrow-left"></i> Back 
                    </Link>
                </div>
                <h1>{ test.title }</h1>
                <p>{ test.description }</p>
                
                <div className="results">
                    <h3>Results: </h3>
                    <table>
                        <tr>
                            <th>User</th>
                            <th>Points</th>
                        </tr>
                        { testResults === null ? () => {
                            return (
                                <Spinner />
                            )
                        } : testResults.map(res => {                            
                            return (
                                <tr className='resultTr' key={ res.userId + res.points }>
                                    <td>{ res.username }</td>
                                    <td className="points">{ res.points }</td>
                                </tr>
                            )
                        }) }
                    </table>
                </div>
                
            </div>
        )
    }
}
