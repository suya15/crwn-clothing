import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';



const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();
    
    return (
    <div className="cart-dropdown">
        <div className="cart-items" >
            {
                cartItems.length ?
                    (cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} item={cartItem} />
                    )))
                    :
                    (<span className="empty-message">Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
        }} >GO TO CHECKOUT</CustomButton>
    </div>
)};


export default CartDropdown;


// without hooks below

// import React from 'react';
// import CustomButton from '../custom-button/custom-button.component';
// import './cart-dropdown.styles.scss';
// import { connect } from 'react-redux';
// import CartItem from '../cart-item/cart-item.component';
// import { selectCartItems } from '../../redux/cart/cart.selectors';
// import { createStructuredSelector } from 'reselect';
// import { withRouter } from 'react-router-dom';
// import { toggleCartHidden } from '../../redux/cart/cart.actions';



// const CartDropdown = ({ cartItems, history, dispatch }) => (
//     <div className="cart-dropdown">
//         <div className="cart-items" >
//             {
//                 cartItems.length ?
//                     (cartItems.map(cartItem => (
//                         <CartItem key={cartItem.id} item={cartItem} />
//                     )))
//                     :
//                     (<span className="empty-message">Your cart is empty</span>)
//             }
//         </div>
//         <CustomButton onClick={() => {
//             history.push('/checkout');
// we were getting the dispatch here coz we were passing the connect function here
//             dispatch(toggleCartHidden());
//         }} >GO TO CHECKOUT</CustomButton>
//     </div>
// );


// // without using memoized selector
// // const mapStateToProps = ({ cart: { cartItems } }) => ({
// //     cartItems
// // });


// // using memoized selector
// // const mapStateToProps = (state) => ({
// //     cartItems: selectCartItems(state)
// // });


// const mapStateToProps = createStructuredSelector({
//     cartItems: selectCartItems
// });


// export default withRouter(connect(mapStateToProps)(CartDropdown));