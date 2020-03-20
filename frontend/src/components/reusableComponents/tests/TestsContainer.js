import React, { Component, Suspense } from 'react'

import Spinner from '../../Spinner/Spinner'

const TestCard = React.lazy(() => import('./TestCard'));

export default class TestsComtainer extends Component {
    render() {
        const { tests, type, user } = this.props;

        return (
            <div className="tests-container">
                { tests.map(test => {
                    return (
                        <Suspense fallback={ <Spinner size="sm" /> } >
                            <TestCard type={ type } test={ test } user={ user } />
                        </Suspense> 
                    )
                }) }
            </div>
        )
    }
}
