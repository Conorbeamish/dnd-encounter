import {LOAD_MAGIC_ITEMS, REMOVE_MAGIC_ITEM} from "../actionTypes";

const magicItems = (state = [], action) => {
    switch (action.type) {
        case LOAD_MAGIC_ITEMS:
            return [...action.magicItems];
        case REMOVE_MAGIC_ITEM:
            return state.filter(magicItem => magicItem._id !== action.id);
        default:
            return state;
    }
};

export default magicItems