import React from 'react';
import { connect } from 'react-redux';
import { gameFetch, gameUnload } from '../actions/actions';
import Game from './Game';
import Spinner from './Spinner';
import PerformanceListContainer from './PerformanceListContainer'
const mapStateToProps = state => ({
    ...state.game
})

const mapDispatchToProps = {
    gameFetch, gameUnload
}
class GameContainer extends React.Component {
    componentDidMount() {
        this.props.gameFetch(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.gameUnload()
    }
    render() {
        const { isFetching, game } = this.props;
        if (isFetching) {
            return (<Spinner />)
        }
        return (
            <div>
                <Game game={game}></Game>
                {game &&<PerformanceListContainer gameId={this.props.match.params.id}/>}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);