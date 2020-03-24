import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_MONSTERS, REMOVE_MONSTER} from "../actionTypes";

export const loadMonsters = monsters => ({
    type: LOAD_MONSTERS,
    monsters
});

export const remove = id => ({
    type: REMOVE_MONSTER,
    id
});

export const removeMonster = (userID, encounterID, monsterID) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${userID}/encounters/${encounterID}/monsters/${monsterID}`)
        .then(() => dispatch(remove(monsterID)))
        .catch((err) => addError(err.message));
    }
} 

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

export function saveMonster(userID, encounterID, data){
    return dispatch => {
        return apiCall("post", `/api/users/${userID}/encounters/${encounterID}/monsters`, data)
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
    }
}