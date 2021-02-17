import React from 'react';
import PlayerList from './PlayerList';
import { playerListFetch, playerListSetPage } from '../actions/actions'
import { connect } from 'react-redux';
import  Spinner  from './Spinner';
import  {Paginator}  from './Paginator';
import PlayerForm from './PlayerForm'
const mapStateToProps = state => ({
    ...state.playerList
})

const mapDispatchToProps = {
    playerListFetch,
    playerListSetPage
}
class PlayerListContainer extends React.Component {
    componentDidMount() {
        this.props.playerListFetch(this.getQueryParamPage());   
    }

    componentDidUpdate(prevProps) {

        const {currentPage, playerListFetch, playerListSetPage} = this.props;
        if(prevProps.match?.params?.page !== this.getQueryParamPage()) {
            playerListSetPage(this.getQueryParamPage())
        }

        if(prevProps.currentPage !== currentPage) {
            playerListFetch(currentPage)
        }
    }

getQueryParamPage () {

    return Number(this.props?.match?.params?.page) || 1
}

changePage(page) {

    const {history, playerListSetPage} = this.props;
    playerListSetPage(page);
    history.push(`/${page}`)
}
    render() {
        const {players, isFetching,  currentPage} = this.props;
        const displayPhotos = this.props.displayPhotos === undefined ? true : this.props.displayPhotos
        if (isFetching) {
            return (<Spinner/>)
        }

        return (
            <div>
            <PlayerList players={players} displayPhotos={displayPhotos}/>
            <PlayerForm/>

            <Paginator currentPage={currentPage} pageCount={10} setPage={this.changePage.bind(this)} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListContainer); 