import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Link,
    withRouter 
  } from "react-router-dom";

  import {Route} from 'react-router'
import LoginForm from './LoginForm'
import BlogPostList from './BlogPostList';
import BlogPostListContainer from './BlogPostListContainer';
import Header from './Header';
import BlogPost from './BlogPost'
import BlogPostContainer  from './BlogPostContainer'
import AccessDenied from './AccessDenied';
import { requests } from '../agent';
import {connect} from 'react-redux'
import {userProfileFetch, userSetId, userLogout } from '../actions/actions'
import BlogPostForm from './BlogPostForm';
import GameListContainer from './GameListContainer';
import CompetitionListContainer from './CompetitionListContainer';
import CompetitionContainer from './CompetitionContainter';
import GameContainer from './GameContainer'
import PerformanceListContainer from './PerformanceListContainer'
import PlayerListContainer from './PlayerListContainer'
import ClubListContainer from './ClubListContainer'
import ClubContainer from './ClubContainer'
import Seelector from './Select'
import CompetitionEditContainer from './CompetitionEditContainer'
import FootballApiContainer from './FootballApiContainer'

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    userLogout
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = window.localStorage.getItem('jwtToken');

        if(token) {
            requests.setToken(token);
        }
    }

    componentDidMount() {
        const userId = window.localStorage.getItem('userId');
        const {userSetId} = this.props;

        if(userId) {
            userSetId(userId)
        }
    }

    componentDidUpdate(prevProps) {
        const {userId, userData, userProfileFetch} = this.props;
        if(prevProps.userId !== userId && userId !== null && userData===null) {
            userProfileFetch(userId);
        }
    }
    render() {
        const {isAuthenticated, userData, userLogout} = this.props;
        return (
            <div>
                hello
                <Header isAuthenticated={isAuthenticated} userData={userData} logout={userLogout}/>
                <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/blog-post-form" component={BlogPostForm} />
                    <Route path="/city/:id" component={BlogPostListContainer} />
                    <Route path="/blog-post/:id" component={BlogPostContainer} />
                    <Route path="/access-denied" component={AccessDenied} />
                    <Route path="/game/:id" component={GameContainer} />
                    <Route path="/games" component={GameListContainer} />
                    <Route path="/competition/edit/:id" component={CompetitionEditContainer} />
                    <Route path="/competition/:id" component={CompetitionContainer} />
                    <Route path="/competitions" component={CompetitionListContainer} />
                    <Route path="/performances" component={PerformanceListContainer} />
                    <Route path="/players" component={PlayerListContainer} />
                    <Route path="/club/:id" component={ClubContainer} />
                    <Route path="/clubs" component={ClubListContainer} />
                    <Route path="/footballapi" component={FootballApiContainer} />

                    {/* <Route path="/selector" component={Seelector} /> */}
                    
                    <Route path="/:page?" component={CompetitionListContainer} />
                    
                </Switch>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App)