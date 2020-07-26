import React, { Component } from 'react'

export default class ConfirmModal extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="modal-overlay"></div>
                <div className="modal-card">
                    <div className="card-top">
                        <div className="icon">
                            <img src='/img/questionmark.svg' alt=""/>
                        </div>
                        <div className="text">
                            { this.props.message }
                        </div>
                    </div>
                    {/* <div className="card-middle">
                        { this.props.message }
                    </div> */}
                    <div className="card-buttons">
                        <button onClick={ () => this.props.setModalChoice(true) } className="cta">{ this.props.positiveChoice }</button>
                        <button onClick={ () => this.props.setModalChoice(false) } className="">{ this.props.negativeChoice }</button>
                    </div>
                </div>
            </div>
        )
    }
}
