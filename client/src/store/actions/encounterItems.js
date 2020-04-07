import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {
    LOAD_ENCOUNTER, 
    LOAD_MONSTERS, 
    ADD_MONSTER,
    REMOVE_MONSTER, 
    LOAD_WEAPONS,
    ADD_WEAPON, 
    REMOVE_WEAPON, 
    LOAD_MAGIC_ITEMS, 
    ADD_MAGIC_ITEM,
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

export const addMonster = monster => ({
    type: ADD_MONSTER,
    monster
})

export const removeMonsterID = id => ({
    type: REMOVE_MONSTER,
    id
});

export const loadWeapons = weapons => ({
    type: LOAD_WEAPONS,
    weapons
}); 

export const addWeapon = weapon => ({
    type: ADD_WEAPON,
    weapon
});

export const removeWeaponID = id => ({
    type: REMOVE_WEAPON,
    id
});

export const loadMagicItems = magicItems => ({
    type: LOAD_MAGIC_ITEMS,
    magicItems
});

export const addMagicItem = magicItem => ({
    type: ADD_MAGIC_ITEM,
    magicItem
});

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
        .then(res => {
            switch (itemType) {
                case("monsters"):
                    return (dispatch(addMonster(res)));
                case("weapons"):
                    return (dispatch(addWeapon(res)));
                case("magicitems"):
                    return(dispatch(addMagicItem(res)));
            }
        })
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

