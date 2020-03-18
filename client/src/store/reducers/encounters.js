import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER} from "../actionTypes";

const encounters = (state = [], action) => {
    switch (action.type) {
        case LOAD_ENCOUNTERS:
            return [...action.encounters];
        default:
            return state;
    }
};

export default encounters