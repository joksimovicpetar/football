import { COMPETITION_LIST, COMPETITION_LIST_ADD, COMPETITION_LIST_REQUEST, COMPETITION_LIST_RECIEVED, COMPETITION_LIST_ERROR, COMPETITION_LIST_SET_PAGE  } from "../actions/constants"

export default (state = {
    competitions: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case COMPETITION_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            return state;
        case COMPETITION_LIST_RECIEVED:
            state = {
                ...state,
                competitions: action.competitions,
                isFetching: false,
            };
            return state;

        case COMPETITION_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                competitions: null
            };
            return state;

        case COMPETITION_LIST_ADD:
            state = {
                ...state,
                competitions: state.competitions ? state.competitions.concat(action.data) : state.competitions
            };
            return state;
        case COMPETITION_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        default:
            return state;
    }
}