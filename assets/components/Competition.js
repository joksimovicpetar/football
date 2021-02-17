import React from 'react';
import Message from './Message'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// const mapStateToProps = state => ({
//     ...state.competition,
//     isAuthenticated: state.auth.isAuthenticated,
//     isAdmin: state.auth.isAdmin
// })
export default class Competition extends React.Component {
    componentDidMount() {
    }

    render() {
        const { competition, isAdmin } = this.props;

        if (!competition) {
            return (<Message message="Competition not found" />)
        }

        return (
            <div className="card mb-3 shadow-sm" key={competition.id}>
                <div className="card-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm"> <h2>
                                {competition.name}
                            </h2>
                                <p className="card-text"> {competition.description}</p>
                                <p className="card-text border-top">
                                    <small className="text-muted">
                                        {competition.description}
                                    </small>
                                </p>
                            </div>
                            <div className="col-lg">
                                {isAdmin &&
                                    <div>
                                        <div className="row">
                                            <Link to={`/competition/edit/${this.props.competition.id}`} className="btn btn-primary" style={{ width: "300px" }}>Edit Competition</Link>
                                        </div>
                                        <div className="row">
                                            <button className="btn btn-outline-primary mr-1" style={{ width: "300px" }} onClick={() => {
                                                this.props.competitionDelete(competition.id)
                                            }}>Delete Competition</button>
                                        </div></div>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
// export default connect(mapStateToProps, null)(Competition);
