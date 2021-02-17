import React from 'react';
import { post } from 'superagent';
import Message from './Message'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./PerformanceList.css";
export default class PerformanceList extends React.Component {
    render() {
        const { performanceList } = this.props;
        if (!performanceList || !performanceList.length) {
            return (<Message message="No performances yet" />)
        }

        return (
            <div className="card mb-3 shadow-sm">
                <div className="card-body border-bottom" key={performance.id}>

                    <div className="container">
                        <div className="row">
                            {/* <div className="col-sm"><h2>Player Performances</h2></div> */}
                            <div className="col-sm"><h2>Player Performances</h2></div>
                            {/* <div className="col-sm"><h2>Player Performances</h2></div> */}
                        </div>
                    </div>
                </div>
                <TransitionGroup>
                    {performanceList.map((performance => {
                        return (
                            <CSSTransition key={performance.id} timeout={500} classNames="fade">
                                <div className="card-body border-bottom" key={performance.id}>
                                    <div className="container">
                                        <div className="row">

                                            <div className="col-sm">
                                                <p className="card-text mb-0">
                                                    First Name: {performance.player.firstName}
                                                </p>
                                                <p className="card-text mb-0">
                                                    Last Name: {performance.player.lastName}
                                                </p>
                                                <p className="card-text mb-0">
                                                    Position: {performance.player.position}
                                                </p>
                                            </div>
                                            <div className="col-sm">
                                                <p className="card-text mb-0">
                                                    <br></br>
                                                </p>
                                                <p className="card-text mb-0">
                                                    {performance.playerPerformance}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>
                        )
                    }))}
                </TransitionGroup>
            </div>
        )
    }
}

