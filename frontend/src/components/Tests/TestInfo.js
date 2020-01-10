import React, { Component } from 'react'

import './css/style.css'

export default class TestInfo extends Component {
    state = {
        isLoading: true,
        test: null
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
    }
    

    render() {
        const { isLoading, test } = this.state;

        if (isLoading) return (
            <h1>Loading...</h1>
        )

        return (
            <div>
                <h1>{ test.title }</h1>
                <p>{ test.description }</p>
                
                <div className="results">
                    <h3>Results: </h3>
                    <table>
                        <tr>
                            <th>User</th>
                            <th>Points</th>
                        </tr>
                        { test.results.map(res => {
                            return (
                                <tr className='resultTr' key={ res.userId + res.points }>
                                    <td>{ res.userId }</td>
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
