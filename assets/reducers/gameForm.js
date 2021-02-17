import { HOST_UPDATE, COMPETITION_LIST_ADD, COMPETITION_LIST_REQUEST, COMPETITION_LIST_RECIEVED, COMPETITION_LIST_ERROR, COMPETITION_LIST_SET_PAGE  } from "../actions/constants"

export default (state = {
    competitions: null,
    isFetching: false,
    currentPage: 1,
    pageCount: null
}, action) => {
    switch (action.type) {
        case HOST_UPDATE:
            state = {
                ...state,
                competitions: action.competitions,
                isFetching: false,
            };
            return state;
        default:
            return state;
    }
}