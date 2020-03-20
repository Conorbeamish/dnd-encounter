import {LOAD_SEARCH_MONSTERS} from "../actionTypes";

const searchMonsters = (state = [], action) => {
    switch (action.type) {
        case LOAD_SEARCH_MONSTERS:
            return [action.searchMonsters];
        default:
            return state;
    }
};

export default searchMonsters