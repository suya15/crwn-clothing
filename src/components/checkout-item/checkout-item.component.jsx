import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import {  addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem, clearItem, removeProduct, addProduct }) => {
    const { name, price, quantity, imageUrl } = cartItem;
    return (
        <div className="checkout-item">
            <div className="image-container">
                <img src={imageUrl} alt='item' />
            </div>
            <span className="name">{name}</span>
            <span className="price">{price}</span>
            <span className="quantity">
                <div className="arrow" onClick={() => removeProduct(cartItem)}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={() => addProduct(cartItem)}>&#10095;</div>
            </span>
            <div className="remove-button" onClick={() => clearItem(cartItem)}>&#10005;</div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    // the function inside the dispatch argument is the function from actions file we are refrencing
    clearItem: item => dispatch(clearItemFromCart(item)),
    removeProduct: item => dispatch(removeItem(item)),
    addProduct: item => dispatch(addItem(item))
});


export default connect(null, mapDispatchToProps)(CheckoutItem);