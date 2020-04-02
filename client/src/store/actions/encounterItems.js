import {apiCall} from "../../services/api";
import {addError} from "./errors";

export function saveItem(userID, encounterID, itemType, data){
    return dispatch => {
        return apiCall("post", `/api/users/${userID}/encounters/${encounterID}/${itemType}`, data)
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
    }
}
