import {LOAD_ENCOUNTER, CLEAR_ENCOUNTER} from "../actionTypes";

const initialState = []

const currentEncounter = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ENCOUNTER:
            return {
                encounter: action.encounter
            };    
        case CLEAR_ENCOUNTER:
            return initialState
        default:
            return state;
    }
};

export default currentEncounter