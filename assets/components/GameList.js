import React from 'react';
import { post } from 'superagent';
import Message from './Message'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import "./GameList.css";
import { Link } from 'react-router-dom';

export default class GameList extends React.Component {
    render() {
        const { gameList } = this.props;
        if (!gameList || !gameList.length) {
            return (<Message message="No games yet" />)
        }

        return (
            <div className="card mb-3 shadow-sm">
                <TransitionGroup>
                    {gameList.map((game => {
                        return (
                            <CSSTransition key={game.id} timeout={500} classNames="fade">
                                <div className="card-body border-bottom" key={game.id}>
                                <Link to={`/game/${game.id}`}>

                                    <div className="container">
                                        <div className="row">
                                        
                                            <div className="col-sm">
                                            <p className="card-text mb-0">
                                                {game.date} 
                                             </p>
                                            </div>
                                            
                                            <div className="col-sm">
                                            <h4 className="card-text mb-0">
                                              {game.host.name}   :   {game.guest.name}
                                             </h4>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    </Link>

                                    {/* <p className="card-text">
                                <small className="text-muted">
                                    {game.host.name}
                                </small>
                                <small className="text-muted">
                                    {game.guest.name}
                                </small>
                            </p> */}
                                </div>
                            </CSSTransition>
                        )
                    }))}
                </TransitionGroup>
            </div>
        )
    }
}

