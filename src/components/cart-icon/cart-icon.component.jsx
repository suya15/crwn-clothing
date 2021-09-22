import React from 'react';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className="cart-icon" onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className="item-count">
            {itemCount}
        </span>
    </div>
);


// without using selector for optimization
// const mapStateToProps = ({ cart: {cartItems }}) => (
//     {
//         // we have just written a selector here because we have written a code in which we are getting the
//         // whole state out but pulling a certain value to get our things done.

//         itemCount: cartItems.reduce((accumalatedQuantity, cartItem) => 
//         accumalatedQuantity + cartItem.quantity, 0)
//     }
// )


// using selector 

const mapStateToProps = (state) => (
    {
        // we have just written a memoize selector here because we have written a code in which we are getting the
        // whole state out but pulling a certain value to get our things done.

        itemCount: selectCartItemsCount(state)
    }
)


const mapDispatchToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);