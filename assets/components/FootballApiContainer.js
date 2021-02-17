import React from 'react';
import { connect } from 'react-redux';
import { footballApiFetch, footballApiUnload } from '../actions/actions';
import FootballApi from './FootballApi';
import Spinner from './Spinner';
import CommentListContainer from './CommentListContainer'
const mapStateToProps = state => ({
    ...state.footballApi
})

const mapDispatchToProps = {
    footballApiFetch, footballApiUnload
}
class FootballApiContainer extends React.Component {
    componentDidMount() {
        this.props.footballApiFetch()
    }

    componentWillUnmount() {
        this.props.footballApiUnload()
    }
    render() {
        const { isFetching, footballMatches } = this.props;
        console.log('match', this.props.footballMatches);
        if (isFetching) {
            return (<Spinner />)
        }
        return (
            <div>
                <FootballApi footballMatches={footballMatches?.matches}></FootballApi>
                {/* {match &&<CommentListContainer footballApiId={this.props.match.params.id}/>} */}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FootballApiContainer);