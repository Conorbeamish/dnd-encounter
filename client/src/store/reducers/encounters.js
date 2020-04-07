import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER, ADD_ENCOUNTER} from "../actionTypes";

let initialState = [];

const encounters = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ENCOUNTERS:
            return [...action.encounters];
        case REMOVE_ENCOUNTER:
            return state.filter(encounter => encounter._id !== action.id);
        case ADD_ENCOUNTER:
            return [
                action.encounter,
                ...state
            ]
        default:
            return state;
    }
};

export default encounters