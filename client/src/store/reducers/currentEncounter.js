import {LOAD_ENCOUNTER} from "../actionTypes";

const currentEncounter = (state = [], action) => {
    switch (action.type) {
        case LOAD_ENCOUNTER:
            return {
                encounter: action.encounter
            };        
        default:
            return state;
    }
};

export default currentEncounter