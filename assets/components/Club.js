import React from 'react';
import { club } from 'superagent';
import Message from './Message'

export default class Club extends React.Component {
   
    componentDidMount() {
    }

    render() {
        const { club } = this.props;

        if (!club) {
            return (<Message message="Club does not exist" />)
        }

        return (
            <div>
                <div className="card mb-3 shadow-sm" key={club.id}>
                    <div className="card-body">
                    <div className="container">
                            <div className="row">
                            <div className="col-sm">
                            <h2>
                            {club.name}
                        </h2>
                        </div>
                        <div className="col-sm"></div>
                                <div className="col-lg">
                                <button className="btn btn-outline-primary mr-1" >Edit Club</button>
                                <button className="btn btn-outline-primary mr-1" onClick={ () => {
                                    this.props.clubDelete(club.id)} }>Delete Club</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div>

        )
    }
}

