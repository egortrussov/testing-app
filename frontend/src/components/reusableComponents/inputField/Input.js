import React from 'react'

import './css/style.css'

const Input = ({ name, onChange, type }) => {
    const handleChange = (e) => {
        console.log(e);
        onChange(e);
    }

    return (
        <div className="input-group">
            <input type="text" type={ type } name={ name } onChange={ (e) => handleChange(e) } />
            <label htmlFor={ name }></label>
        </div>
    )
}

export default Input
