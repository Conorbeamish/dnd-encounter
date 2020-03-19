import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import encounters from "./encounters";
import monsters from "./monsters";

const rootReducer = combineReducers({
    currentUser,
    errors,
    encounters,
    monsters
});

export default rootReducer;