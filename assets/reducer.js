import {combineReducers} from "redux";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import commentList from "./reducers/commentList";
import gameList from "./reducers/gameList";
import competitionList from "./reducers/competitionList";
import competitionPost from "./reducers/competition";
import competitionForm from './reducers/competitionForm';
import competition from './reducers/competition';
import auth from "./reducers/auth";
import {routerReducer} from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import blogPostForm from './reducers/blogPostForm'
import game from './reducers/game'
import performanceList from './reducers/performanceList'
import playerList from './reducers/playerList';
import clubList from './reducers/clubList';
import club from './reducers/club';
import clubForm from './reducers/clubForm';
import gameForm from './reducers/gameForm';
import footballApi from './reducers/footballApi';

export default combineReducers({
    blogPostList,
    blogPost,
    clubList,
    club,
    clubForm,
    commentList,
    performanceList,
    auth,
    blogPostForm,
    game,
    gameForm,
    gameList,
    competition,
    competitionList,
    competitionPost,
    competitionForm,
    playerList,
    footballApi,
    router: routerReducer,
    form: formReducer,
})