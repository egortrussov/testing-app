import React from 'react'
import { useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import './css/style.css'

const BackLink = ({ link }) => {
    let history = useHistory();

    return (
        <div className="page-top">
            <span onClick={ () => history.goBack() } className="a">
                <FontAwesomeIcon icon={ faArrowLeft } /> Back 
            </span>
        </div>
    )
}

export default BackLink;