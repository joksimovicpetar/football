import { PLAYER_LIST, PLAYER_LIST_ADD, PLAYER_LIST_REQUEST, PLAYER_LIST_RECIEVED, PLAYER_LIST_ERROR, PLAYER_LIST_SET_PAGE  } from "../actions/constants"

export default (state = {
    players: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case PLAYER_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            return state;
        case PLAYER_LIST_RECIEVED:
            state = {
                ...state,
                players: action.data,
                isFetching: false,
            };
            return state;

        case PLAYER_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                players: null
            };
            return state;

        case PLAYER_LIST_ADD:
            state = {
                ...state,
                players: state.players ? state.players.concat(action.data) : state.players
            };
            return state;
        case PLAYER_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        default:
            return state;
    }
}