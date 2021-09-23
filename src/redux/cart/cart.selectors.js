import { createSelector } from 'reselect';

// input selector
const selectCart = state => state.cart;


// memoize output selectors
export const selectCartItems = createSelector(
    [selectCart],
    // below cart => is return of above [selectCart]
    cart => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);


export const selectCartItemsCount = createSelector(
    [selectCartItems],
    // below cartItems => is return of above [selectCartItems]
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity, 0)
);

export const selectCartItemsTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price, 0)
);