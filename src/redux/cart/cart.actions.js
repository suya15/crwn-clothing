import { CartActionTypes } from "./cart.types";

export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN // no need for payload here it is actually optional and we are not doing anything on payload in reducer.
}); 