import React from 'react';

export default class Spinner extends React.Component {
    render() {
        return (
            <div className="card mb-3 shadow-sm">
            <div className="card-body">
                <div className="card-text">
                <div className="spinner-border text-dark"></div>

                </div>
            </div>
        </div>
        )

    }
}