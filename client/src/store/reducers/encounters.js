import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER} from "../actionTypes";

const encounters = (state = [], action) => {
    switch (action.type) {
        case LOAD_ENCOUNTERS:
            return [...action.encounters];
        case REMOVE_ENCOUNTER:
            return state.filter(encounter => encounter._id !== action._id);
        default:
            return state;
    }
};

export default encounters