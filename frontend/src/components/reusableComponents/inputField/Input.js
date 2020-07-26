import React from 'react'

import './css/style.css'

const Input = ({ name, onChange, type, isMini, value }) => {
    const handleChange = (e) => {
        console.log(e);
        onChange(e);
    }

    const extraClassName = isMini ? 'mini' : '';

    return (
        <div className={ "input-group " + extraClassName}>
            <input value={ value } autoComplete={ isMini ? "off" : "on" } className={ extraClassName } type={ type } name={ name } onChange={ (e) => handleChange(e) } />
            <label htmlFor={ name }></label>
        </div>
    )
}

export default Input
