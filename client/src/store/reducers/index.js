import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import encounters from "./encounters";
import monsters from "./monsters";
import searchResults from "./searchResults";
import currentEncounter from "./currentEncounter";

const rootReducer = combineReducers({
    currentUser,
    errors,
    encounters,
    monsters,
    searchResults,
    currentEncounter
});

export default rootReducer;