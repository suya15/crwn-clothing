export const addItemToCart = (cartItems, cartItemToAdd) => {

    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id );

    if(existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1} :
            cartItem
            )
    }

    // since this below return will not run if the above if gets executed, it will only run on items first entry
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};