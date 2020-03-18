import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import encounters from "./encounters";

const rootReducer = combineReducers({
    currentUser,
    errors,
    encounters
});

export default rootReducer;