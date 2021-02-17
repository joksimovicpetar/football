import React from 'react';
import { connect } from 'react-redux';
import { competitionFetch, competitionUnload, competitionDelete  } from '../actions/actions';
import Competition from './Competition';
import Spinner from './Spinner';
import GameListContainer from './GameListContainer'
import Message from './Message'

const mapStateToProps = state => ({
    ...state.competition,
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.isAdmin
})

const mapDispatchToProps = {
    competitionFetch, competitionUnload, competitionDelete
}

class CompetitionContainer extends React.Component {
    componentDidMount() {
        this.props.competitionFetch(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.competitionUnload()
    }

    render() {
        const { isFetching, competition,  competitionDelete, isAuthenticated, isAdmin} = this.props;

        if (isFetching) {
            return (<Spinner />)
        }

        if (!isAuthenticated) {
            return (<Message message="Please Log In" />)
        }

        return (
            <div>
                <Competition competition={competition} competitionDelete={competitionDelete} isAdmin={isAdmin}></Competition>
                {competition &&<GameListContainer competitionId={this.props.match.params.id} displayForm={false}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionContainer);