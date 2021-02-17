import { GAME_RECIEVED, GAME_REQUEST, GAME_ERROR, GAME_UNLOAD  } from "../actions/constants";

export default(state = {
    game: null,
    isFetching: false
}, action) => {
    switch(action.type) {
        case GAME_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case GAME_RECIEVED:
            return {
                ...state,
                game: action.game,
                isFetching: false
            };
        case GAME_ERROR:
            return {
                ...state,
                isFetching: false
            };
            case GAME_UNLOAD:
                return {
                    ...state,
                    isFetching: false,
                    game: null
                };
        default: 
            return state;
    }
}