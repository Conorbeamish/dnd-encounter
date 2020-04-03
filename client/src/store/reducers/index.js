import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import encounters from "./encounters";
import monsters from "./monsters";
import magicItems from "./magicItems";
import weapons from "./weapons";
import searchResults from "./searchResults";
import currentEncounter from "./currentEncounter";

const rootReducer = combineReducers({
    currentUser,
    errors,
    encounters,
    monsters,
    magicItems,
    weapons,
    searchResults,
    currentEncounter
});

export default rootReducer;