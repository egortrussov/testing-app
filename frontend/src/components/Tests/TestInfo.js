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
                res.testResults.sort((res1, res2) => {
                    return res2.points - res1.points;
                })
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
                <Link class="btn btn-cta" to={ `/app/passTest/${ test._id }` }>
                    Pass test!
                </Link>
                
                <div className="results">
                    <h3>Results: </h3>
                    <table>
                        <col className="username" />
                        <col className="points" />
                        <tr>
                            <th>User</th>
                            <th className="points">Points</th>
                        </tr>
                        { testResults === null ? () => {
                            return (
                                <Spinner />
                            )
                        } : testResults.map(res => {                            
                            return (
                                <tr className='resultTr' key={ res.userId + res.points }>
                                    <td>{ res.username }</td>
                                    <td className="points">{ res.points }/{ res.answers.length }</td>
                                </tr>
                            )
                        }) }
                    </table>
                </div>
                
            </div>
        )
    }
}
