import {LOAD_WEAPONS, REMOVE_WEAPON} from "../actionTypes";

const weapons = (state = [], action) => {
    switch (action.type) {
        case LOAD_WEAPONS:
            return [...action.weapons];
        case REMOVE_WEAPON:
            return state.filter(weapon => weapon._id !== action.id);
        default:
            return state;
    }
};

export default weapons