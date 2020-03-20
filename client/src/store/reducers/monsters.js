import {LOAD_MONSTERS, REMOVE_MONSTER} from "../actionTypes";

const monsters = (state = [], action) => {
    switch (action.type) {
        case LOAD_MONSTERS:
            return [...action.monsters];
        case REMOVE_MONSTER:
            return state.filter(monster => monster._id !== action.id);
        default:
            return state;
    }
};

export default monsters