import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER} from "../actionTypes";

export const loadEncounters = encounters => ({
    type: LOAD_ENCOUNTERS,
    encounters
});

export function fetchEncounters(userId){
    return dispatch => {
        return apiCall("get", `/api/users/${userId}/encounters`)
        .then((res) => {
            dispatch(loadEncounters(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}