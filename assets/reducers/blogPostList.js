import { BLOG_POST_LIST, BLOG_POST_LIST_ADD, BLOG_POST_LIST_REQUEST, BLOG_POST_LIST_RECIEVED, BLOG_POST_LIST_ERROR } from "../actions/constants"

export default (state = {
    posts: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case BLOG_POST_LIST_REQUEST:
            state = {
                ...state,
                isFetching: true
            };
            console.log('w');
            return state;
        case BLOG_POST_LIST_RECIEVED:
            state = {
                ...state,
                posts: action.data,
                isFetching: false,
            };
            console.log('d');
            return state;

        case BLOG_POST_LIST_ERROR:
            state = {
                ...state,
                isFetching: false,
                posts: null
            };
            console.log('s');
            return state;

        case BLOG_POST_LIST_ADD:
            state = {
                ...state,
                posts: state.posts ? state.posts.concat(action.data) : state.posts
            };
            console.log('c');
            return state;

        default:
            console.log('sscccss');

            return state;
    }
}