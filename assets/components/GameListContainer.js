import React from 'react';
import {connect} from 'react-redux';
import {gameListFetch, gameListUnload} from '../actions/actions';
import BlogPost from './BlogPost';
import GameForm from './GameForm';

import GameList from './GameList';
import  Spinner  from './Spinner';

const mapStateToProps = state => ({
    ...state.gameList,
    isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
    gameListFetch, gameListUnload
}
class GameListContainer extends React.Component {
    componentDidMount() {
        this.props.gameListFetch(this.props.blogPostId)
    }

    componentWillUnmount() {
        this.props.gameListUnload();
    }
    render() {
        const {isFetching, gameList, isAuthenticated, blogPostId } = this.props;
        const displayForm = this.props.displayForm === undefined ? true : this.props.displayForm
        if(isFetching) {
            return (<Spinner/>)
        }
        return (
            <div>
            <GameList gameList={gameList}></GameList>
            {isAuthenticated && displayForm && <GameForm blogPostId= {blogPostId}/>}
            </div>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameListContainer);