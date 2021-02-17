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
            height: "300px",
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
                        </div>
                    </div>
                {players && players.map(player => (
                    <div className="card mb-3 shadow-sm" key={player.id}>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm">
                                        <p className="card-text">First Name: {player.firstName}</p>
                                        <p className="card-text">Last Name: {player.lasteName}</p>
                                        <p className="card-text">Date of Birth: {player.dateOfBirth}</p>
                                        <p className="card-text">Position: {player.position}</p>
                                        <p className="card-text">City: {player.city.name}</p>
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