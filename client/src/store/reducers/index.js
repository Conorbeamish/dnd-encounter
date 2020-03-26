import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import encounters from "./encounters";
import monsters from "./monsters";
import searchMonsters from "./searchMonsters";
import currentEncounter from "./currentEncounter";

const rootReducer = combineReducers({
    currentUser,
    errors,
    encounters,
    monsters,
    searchMonsters,
    currentEncounter
});

export default rootReducer;