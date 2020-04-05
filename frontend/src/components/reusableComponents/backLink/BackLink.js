import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BackLink = ({ link }) => {
    let history = useHistory();

    return (
        <div onClick={ () => history.goBack() } className="page-top">
            <a>
                <FontAwesomeIcon icon={ faArrowLeft } /> Back 
            </a>
        </div>
    )
}

export default BackLink;