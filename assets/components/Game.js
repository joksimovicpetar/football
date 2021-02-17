import React from 'react';
import { post } from 'superagent';
import Message from './Message'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state.game,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
})
class Game extends React.Component {
    componentDidMount() {
    }

    render() {
        const {game, isAuthenticated, isAdmin} = this.props;
        if(!game) {
            return (<Message message="Game Not Found"/>)
        }
        if(!isAuthenticated) {
            return (<Message message="Please Log In"/>)
        }
        return (
            <div className="card mb-3 shadow-sm" key={post.id}>
                        <div className="card-body">
                            <h2>Game</h2>
                            <p className="card-text">Host: {game.host.name}</p>
                            <p className="card-text">Guest: {game.guest.name}</p>
                            <p className="card-text">Competition: {game.competition.name}</p>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                Date: {game.date}

                                    {/* {timeago().format(post.published)} */}
                                </small>
                            </p>
                            <p className="card-text border-top">
                                <small className="text-muted">
                                    {game.name}

                                    {/* {timeago().format(post.published)} */}
                                </small>
                            </p>
                        </div>
                    </div>
        )
    }
}

export default connect(mapStateToProps, null)(Game); 
