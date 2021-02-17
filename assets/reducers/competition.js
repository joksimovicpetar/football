import { COMPETITION_RECIEVED, COMPETITION_REQUEST, COMPETITION_ERROR, COMPETITION_UNLOAD, COMPETITION_DELETE , COMPETITION_DELETED  } from "../actions/constants";

export default (state = {
    competition: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case COMPETITION_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case COMPETITION_RECIEVED:
            return {
                ...state,
                competition: action.competition,
                isFetching: false
            };
        case COMPETITION_ERROR:
            return {
                ...state,
                isFetching: false
            };
        case COMPETITION_UNLOAD:
            return {
                ...state,
                isFetching: false,
                competition: null
            };
        case COMPETITION_DELETE:
            return {
                ...state,
                isFetching: true
            };
        case COMPETITION_DELETED:
            return {
                ...state,
                isFetching: false,
                competition: null
            };
        default:
            return state;
    }
}