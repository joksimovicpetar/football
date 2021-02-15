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
import {userProfileFetch, userSetId } from '../actions/actions'

const mapStateToProps = state => ({
    ...state.auth
})

const mapDispatchToProps = {
    userProfileFetch,
    userSetId
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
            console.log('old user ', prevProps.userId);
            userProfileFetch(userId);
        }
    }
    render() {
        const {isAuthenticated, userData} = this.props;
        return (
            <div>
                hello
                <Header isAuthenticated={isAuthenticated} userData={userData}/>
                <Switch>
                    <Route path="/city/:id" component={BlogPostListContainer} />
                    <Route path="/blog-post/:id" component={BlogPostContainer} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/access-denied" component={AccessDenied} />
                    <Route path="/" component={BlogPostListContainer} />
                </Switch>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (App)