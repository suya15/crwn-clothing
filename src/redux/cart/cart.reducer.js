import UserActionTypes from "../user/user.types";
import { CartActionTypes } from "./cart.types";
import { addItemToCart, removeItemFromCart } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden
            };

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)


                // cartItems: [...state.cartItems, action.payload] 
                // ...state.cartItems is old cartItem payload, and action.payload is the newly added payload
            };

        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )
            };

        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        // this can be done to clear the cart on sign out success
        // case UserActionTypes.SIGN_OUT_SUCCESS:
        //     return {
        //         ...state,
        //         cartItems: []
        //     }


        default:
            return state;
    }
}

export default cartReducer;