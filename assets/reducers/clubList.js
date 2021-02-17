import { CLUB_LIST, CLUB_LIST_ADD, CLUB_LIST_REQUEST, CLUB_LIST_RECIEVED, CLUB_LIST_ERROR, CLUB_LIST_SET_PAGE  } from "../actions/constants"

export default (state = {
    clubs: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case CLUB_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            return state;
        case CLUB_LIST_RECIEVED:
            console.log('sisisi', action.data);
            state = {
                ...state,
                clubs: action.data,
                isFetching: false,
            };
            return state;

        case CLUB_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                clubs: null
            };
            return state;

        case CLUB_LIST_ADD:
            state = {
                ...state,
                clubs: state.clubs ? state.clubs.concat(action.data) : state.clubs
            };
            return state;
        case CLUB_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        default:
            return state;
    }
}