import React from 'react';
import { connect } from 'react-redux';
import { clubFetch, clubUnload, clubDelete } from '../actions/actions';
import Club from './Club';
import Spinner from './Spinner';
import PlayerListContainer from './PlayerListContainer'

const mapStateToProps = state => ({
    ...state.club
})

const mapDispatchToProps = {
    clubFetch, clubUnload, clubDelete
}
class ClubContainer extends React.Component {
    componentDidMount() {
        this.props.clubFetch(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.clubUnload()
    }

    render() {
        const { isFetching, club, clubDelete } = this.props;
        
        if (isFetching) {
            return (<Spinner />)
        }
        return (
            <div>
                <Club club={club}  clubDelete={clubDelete}></Club>
                {club &&<PlayerListContainer clubId={this.props.match.params.id} displayPhotos={false}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClubContainer);