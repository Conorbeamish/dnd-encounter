import {LOAD_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS} from "../actionTypes";

const defaultState = []

const searchResults = (state = defaultState, action) => {
    switch (action.type) {
        case LOAD_SEARCH_RESULTS:
            return action.searchResults;
        case REMOVE_SEARCH_RESULTS:
            return defaultState;
        default:
            return state;
    }
};

export default searchResults