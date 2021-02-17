import { PERFORMANCE_LIST_RECIEVED, PERFORMANCE_LIST_REQUEST, PERFORMANCE_LIST_ERROR, PERFORMANCE_LIST_UNLOAD, PERFORMANCE_ADDED } from "../actions/constants";

export default (state = {
    performanceList: null,
    isFetching: false
}, action) => {
    switch (action.type) {
        case PERFORMANCE_LIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        case PERFORMANCE_LIST_RECIEVED:
            return { 
                ...state,
                performanceList: action.data,
                isFetching: false
            };
        case PERFORMANCE_ADDED:
            return{
                ...state,
                performanceList: [action.performance, ...state.performanceList]
            }
        case PERFORMANCE_LIST_ERROR:
        case PERFORMANCE_LIST_UNLOAD:
            return {
                ...state,
                isFetching: false,
                performanceList: null
            };
        default:
            return state;
    }
}