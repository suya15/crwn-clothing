import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

// this is a new ES6 featurein which if their is no value is passed for an argument like here state than 
// INITIAL_STATE WILL BE PASSED BY DEFAULT (since null is also a value)

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,    // everything on state which is not in the payload and not changed
                currentUser: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
