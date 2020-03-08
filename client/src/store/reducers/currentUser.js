import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {}
};

export default(state = DEFAULT_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                //returns true if a user is authenticated
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
}