import React, { Component } from 'react'

export default class ConfirmModal extends Component {
    render() {
        return (
            <div className="modal-wrapper">
                <div className="modal-overlay"></div>
                <div className="modal-card">
                    <div className="card-top">
                        <div className="icon"></div>
                        <div className="text">
                            { this.props.message }
                        </div>
                    </div>
                    {/* <div className="card-middle">
                        { this.props.message }
                    </div> */}
                    <div className="card-buttons">
                        <button className="cta">{ this.props.positiveChoice }</button>
                        <button className="">{ this.props.negativeChoice }</button>
                    </div>
                </div>
            </div>
        )
    }
}
