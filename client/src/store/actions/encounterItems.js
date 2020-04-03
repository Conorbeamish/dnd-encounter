import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {
    LOAD_ENCOUNTER, 
    LOAD_MONSTERS, 
    REMOVE_MONSTER, 
    LOAD_WEAPONS, 
    REMOVE_WEAPON, 
    LOAD_MAGIC_ITEMS, 
    REMOVE_MAGIC_ITEM
} from "../actionTypes"


export const loadEncounter = encounter => ({
    type: LOAD_ENCOUNTER,
    encounter
});

export const loadMonsters = monsters => ({
    type: LOAD_MONSTERS,
    monsters
});

export const removeMonsterID = id => ({
    type: REMOVE_MONSTER,
    id
});

export const loadWeapons = weapons => ({
    type: LOAD_WEAPONS,
    weapons
});

export const removeWeaponID = id => ({
    type: REMOVE_WEAPON,
    id
})

export const loadMagicItems = magicItems => ({
    type: LOAD_MAGIC_ITEMS,
    magicItems
})

export const removeMagicItemID = id => ({
    type: REMOVE_MAGIC_ITEM,
    id
})

export function fetchEncounter(userId, encounterID){
    return dispatch => {
        return apiCall("get", `/api/users/${userId}/encounters/${encounterID}`)
        .then((res) => {
            dispatch(loadEncounter(res));
            dispatch(loadMonsters(res.monsters));
            dispatch(loadWeapons(res.weapons));
            dispatch(loadMagicItems(res.magicItems));
        })
        .catch(err => {
            dispatch(addError(err.message));
        });
    }
}

export function saveItem(userID, encounterID, itemType, data){
    return dispatch => {
        return apiCall("post", `/api/users/${userID}/encounters/${encounterID}/${itemType}`, data)
        .then(res => {})
        .catch(err => dispatch(addError(err.message)));
    }
}


export const removeItem = (userID, encounterID,itemType, itemID) => {
    return dispatch => {
        return apiCall("delete", `/api/users/${userID}/encounters/${encounterID}/${itemType}/${itemID}`)
        .then(() => {
            switch (itemType) {
                case("monsters"):
                    return (dispatch(removeMonsterID(itemID)));
                case("weapons"):
                    return (dispatch(removeWeaponID(itemID)));
                case("magicitems"):
                    return(dispatch(removeMagicItemID(itemID)));
            }
        })
        .catch((err) => addError(err.message));
    }
} 

