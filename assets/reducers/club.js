import { CLUB_RECIEVED, CLUB_REQUEST, CLUB_ERROR, CLUB_UNLOAD, CLUB_DELETE , CLUB_DELETED } from "../actions/constants";

export default (state = {
    club: null,
    isFetching: false
}, action) => {
    switch (action.type) {

        case CLUB_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case CLUB_RECIEVED:
            return {
                ...state,
                club: action.data,
                isFetching: false
            };
        case CLUB_ERROR:
            return {
                ...state,
                isFetching: false
            };
        case CLUB_UNLOAD:
            return {
                ...state,
                isFetching: false,
                club: null
            };
        case CLUB_DELETE:
            return {
                ...state,
                isFetching: true
            };
        case CLUB_DELETED:
            return {
                ...state,
                isFetching: false,
                club: null
            };
        default:
            return state;
    }
}