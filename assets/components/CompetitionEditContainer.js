import React from 'react';
import { connect } from 'react-redux';
import { competitionFetch, competitionUnload, competitionDelete  } from '../actions/actions';
import Competition from './Competition';
import Spinner from './Spinner';
import CompetitionForm  from './CompetitionForm'

const mapStateToProps = state => ({
    ...state.competition,
    isAdmin: state.auth.isAdmin
})

const mapDispatchToProps = {
    competitionFetch, competitionUnload, competitionDelete
}
class CompetitionEditContainer extends React.Component {
    componentDidMount() {
        this.props.competitionFetch(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.competitionUnload()
    }
    render() {
        const { isFetching, competition,  competitionDelete, isAdmin} = this.props;

        if (isFetching) {
            return (<Spinner />)
        }
        
        return (
            <div>
               {isAdmin && <CompetitionForm competition={competition} ></CompetitionForm>} 
                {/* {competition &&<GameListContainer competitionId={this.props.match.params.id} displayForm={false}/>} */}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetitionEditContainer);