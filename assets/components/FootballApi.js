import React from 'react';
import { match } from 'superagent';
import Message from './Message'

export default class FootballApi extends React.Component {
    componentDidMount() {
    }

    render() {
        const { footballMatches } = this.props;

        console.log('fb matches', footballMatches);

        if (!footballMatches) {
            return (<Message message="Blod Post does not exist" />)
        }

        return (
            <div>
                <div className="card mb-3 shadow-sm" key={1}>
                    <div className="card-body"><h2>Champions League Matches</h2></div>
                </div>
                {footballMatches && footballMatches.map(footballMatch => (
                    <div className="card mb-3 shadow-sm" key={footballMatch.id}>
                    <div className="card-body">
                    <h5 className="card-title">{footballMatch.homeTeam.name} - {footballMatch.awayTeam.name} </h5>

                        <p className="card-text">Group: {footballMatch.group}</p>
                        <p className="card-text">Date: {footballMatch.utcDate}</p>
                        <p className="card-text">Status: {footballMatch.status}</p>
                        <h6 className="card-text">Result: {footballMatch.score.fullTime.awayTeam} : {footballMatch.score.fullTime.homeTeam}</h6>
                        {/* <p className="card-text border-top">
                            <small className="text-muted">
                                {footballMatches.matches[0].name}
                            </small>
                        </p> */}
                    </div>
                </div>
                ))}
                
            </div>
        )
    }
}

