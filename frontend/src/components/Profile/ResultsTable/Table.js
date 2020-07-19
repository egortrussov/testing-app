import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        const { tests } = this.props;

        return (
            <div>
                {
                    tests.map(test => {
                        return (
                            <h3>
                                { test.title }, { test.avgPoints }
                            </h3>
                        )
                    })
                }
            </div>
        )
    }
}
