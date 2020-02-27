import React from 'react'

import './Spinner.css'

const Spinner = ({ size }) => {
    console.log(size);
    const extraClassName = size === "sm" ? "small" : "";

    return (
        <div className={ "loader-wrapper " + extraClassName }>
            <div className={ "loader " + extraClassName }></div>
        </div>
        
    )
}

export default Spinner