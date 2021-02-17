import { BLOG_POST_LIST, BLOG_POST_LIST_ADD, BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_RECIEVED, BLOG_POST_LIST_ERROR, BLOG_POST_LIST_SET_PAGE  } from "../actions/constants"

export default (state = {
    posts: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case BLOG_POST_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            return state;
        case BLOG_POST_LIST_RECIEVED:
            state = {
                ...state,
                posts: action.data,
                isFetching: false,
            };
            return state;

        case BLOG_POST_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                posts: null
            };
            return state;

        case BLOG_POST_LIST_ADD:
            state = {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : state.posts
            };
            return state;
        case BLOG_POST_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page
            }

        default:
            return state;
    }
}