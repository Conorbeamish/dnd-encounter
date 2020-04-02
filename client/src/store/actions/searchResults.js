import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS} from "../actionTypes";

export const loadSearchResults = searchResults => ({
    type: LOAD_SEARCH_RESULTS,
    searchResults
});

export const clearSearchResults = () => ({
    type: REMOVE_SEARCH_RESULTS
})

export function fetchSearchResults(search, type){
    return dispatch => {
        return apiCall("get", `https://api.open5e.com/${type}/?search=${search}`)
        .then((res) => {
            res.searchType = type;
            dispatch(loadSearchResults(res));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}
