import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_SEARCH_MONSTERS} from "../actionTypes";

export const loadSearchMonsters = searchMonsters => ({
    type: LOAD_SEARCH_MONSTERS,
    searchMonsters
});

export function fetchSearchMonsters(search){
    return dispatch => {
        return apiCall("get", `https://api.open5e.com/monsters/?search=${search}`)
        .then((res) => {
            dispatch(loadSearchMonsters(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}
