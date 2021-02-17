import { GAME_LIST_RECIEVED, GAME_LIST_REQUEST, GAME_LIST_ERROR, GAME_LIST_UNLOAD, GAME_ADDED } from "../actions/constants";

export default (state = {
    gameList: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case GAME_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case GAME_LIST_RECIEVED:
            return { 
                ...state,
                gameList: action.data,
                isFetching: false
            };
        case GAME_ADDED:
            return{
                ...state,
                gameList: [...state.gameList, action.game]
            }
        case GAME_LIST_ERROR:
        case GAME_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                gameList: null
            };
        default:
            return state;
    }
}