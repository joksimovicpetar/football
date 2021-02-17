import { FOOTBALL_API_RECIEVED, FOOTBALL_API_REQUEST, FOOTBALL_API_ERROR  } from "../actions/constants";

export default(state = {
    post: null,
    isFetching: false
}, action) => {
    switch(action.type) {
        case FOOTBALL_API_REQUEST:
            console.log('dispatched req');
            return {
                ...state,
                isFetching: true
            };
        case FOOTBALL_API_RECIEVED:
            console.log('api rec', action.footballMatches);
            return {
                ...state,
                footballMatches: action.footballMatches,
                isFetching: false
            };
        case FOOTBALL_API_ERROR:
            console.log('api err', action.footballMatches);

            return {
                ...state,
                isFetching: false
            };
        default: 
            return state;
    }
}