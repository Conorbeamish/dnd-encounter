import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER, CLEAR_ENCOUNTER} from "../actionTypes";

const initialState = []

const encounters = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ENCOUNTERS:
            return [...action.encounters];
        case REMOVE_ENCOUNTER:
            return state.filter(encounter => encounter._id !== action.id);
        case CLEAR_ENCOUNTER:
            return initialState
        default:
            return state;
    }
};

export default encounters