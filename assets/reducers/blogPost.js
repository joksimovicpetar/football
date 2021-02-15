import { BLOG_POST_RECIEVED, BLOG_POST_REQUEST, BLOG_POST_ERROR, BLOG_POST_UNLOAD  } from "../actions/constants";

export default(state = {
    post: null,
    isFetching: false
}, action) => {
    switch(action.type) {
        case BLOG_POST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case BLOG_POST_RECIEVED:
            return {
                ...state,
                post: action.data,
                isFetching: false
            };
        case BLOG_POST_ERROR:
            return {
                ...state,
                isFetching: false
            };
            case BLOG_POST_UNLOAD:
                return {
                    ...state,
                    isFetching: false,
                    post: null
                };
        default: 
            return state;
    }
}