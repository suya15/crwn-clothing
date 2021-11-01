import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

// this is a new ES6 featurein which if their is no value is passed for an argument like here state than 
// INITIAL_STATE WILL BE PASSED BY DEFAULT (since null is also a value)

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
        // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS: // these are commented coz a common action has been made, it also shows the possibility how multiple actions can be stacked if going for same activity
        case UserActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,    // everything on state which is not in the payload and not changed
                currentUser: action.payload,
                error: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            };
        // case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
        // case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;
    }
}

export default userReducer;
