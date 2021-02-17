import React from 'react';
import { Link } from 'react-router-dom';
import timeago from 'timeago.js'
import Message from './Message'
import  Spinner  from './Spinner';

class CompetitionList extends React.Component {

    render() {
        const { competitions } = this.props;
 
        if (!competitions?.length) {
            return (<Message message= "Competitions not found"/>)
        }

        return (
            <div>
                {competitions && competitions.map(competition => (
                    <div className="card mb-3 shadow-sm" key={competition.id}>
                        <div className="card-body">
                            <h3>
                                <Link to={`/competition/${competition.id}`}>{competition.name}</Link>
                            </h3>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                {competition.description}
                                </small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default CompetitionList