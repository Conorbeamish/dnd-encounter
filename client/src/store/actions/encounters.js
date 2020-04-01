import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_ENCOUNTERS, REMOVE_ENCOUNTER, LOAD_ENCOUNTER, CLEAR_ENCOUNTER} from "../actionTypes";

export const loadEncounters = encounters => ({
    type: LOAD_ENCOUNTERS,
    encounters
});

export const loadEncounter = encounter => ({
    type: LOAD_ENCOUNTER,
    encounter
});

export const clearEncounter = () => ({
    type: CLEAR_ENCOUNTER
})

export const remove = id => ({
    type: REMOVE_ENCOUNTER,
    id
});

export const removeEncounter = (userID, encounterID) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${userID}/encounters/${encounterID}`)
        .then(() => dispatch(remove(encounterID)))
        .catch((err) => addError(err.message));
    }
}

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

export function fetchEncounter(userId, encounterID){
    return dispatch => {
        return apiCall("get", `/api/users/${userId}/encounters/${encounterID}`)
        .then((res) => {
            dispatch(loadEncounter(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}

export const postEncounter = (text) => (dispatch, getState) => {
    let {currentUser} = getState()
    const id = currentUser.user.id;
    return apiCall("post", `/api/users/${id}/encounters`, text)
    .then(res => {})
    .catch(err => dispatch(addError(err.message)));
}