import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MONSTERS, REMOVE_MONSTER} from "../actionTypes";

export const loadMonsters = monsters => ({
    type: LOAD_MONSTERS,
    monsters
});

export function fetchMonsters(userID, encounterID){
    return dispatch => {
        return apiCall("get", `/api/users/${userID}/encounters/${encounterID}/monsters/`)
        .then((res) => {
            dispatch(loadMonsters(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}
