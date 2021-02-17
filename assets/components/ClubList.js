import React from 'react';
import { Link } from 'react-router-dom';
import timeago from 'timeago.js'
import Message from './Message'
import  Spinner  from './Spinner';

class ClubList extends React.Component {

    render() {
        const { clubs } = this.props;

        
        if (!clubs?.length) {
            return (<Message message= "Blod Posts not found"/>)
        }
        return (
            <div>
                {clubs && clubs.map(club => (
                    <div className="card mb-3 shadow-sm" key={club.id}>
                        <div className="card-body">
                            <h3>
                                <Link to={`/club/${club.id}`}>{club.name}</Link>
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default ClubList