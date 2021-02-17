import React from 'react';
import { Link } from 'react-router-dom';
import timeago from 'timeago.js'
import Message from './Message'
import Spinner from './Spinner';
import './Player.css';

class PlayerList extends React.Component {

    render() {
        const imageStyle = {
            width: "100%",
            height: "350px",
        };
        const { players } = this.props;
        const displayPhotos = this.props.displayPhotos;
    
        if (!players?.length) {
            return (<Message message="Players not found" />)
        }
        return (
            <div>
                <div className="card mb-3 shadow-sm">
                <div className="card-body">
                        <h4>Players:</h4>
                        <Link to={`/api/player/new/la`}>Add New Player</Link>
                        </div>
                    </div>
                {players && players.map(player => (
                    <div className="card mb-3 shadow-sm" key={player.id}>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <h4 className="card-text">First Name: {player.firstName}</h4>
                                        <h4 className="card-text">Last Name: {player.lastName}</h4>
                                        <h4 className="card-text">Date of Birth: {player.dateOfBirth.split('T')[0]}</h4>
                                        <h4 className="card-text">Position: {player.position}</h4>
                                        <h4 className="card-text">City: {player.city.name}</h4>
                                    </div>
                                    
                                    {displayPhotos &&  <div className="col-sm">
                                        <img src={`uploads/${player.profileImage}`} style={imageStyle} />
                                    </div>}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default PlayerList