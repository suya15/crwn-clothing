import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './collection-item.styles.scss';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({item, addItem}) => {
    const {id, name, price, imageUrl} = item;
    return (

    <div className="collection-item">
        <div className="image"
        style={
            {backgroundImage: `url(${imageUrl})`}
        }
        />
        <div className="collection-footer">
            <span className="name">{name}</span>
            <span className="price">{price}</span>
        </div>
        <CustomButton onClick={() => addItem(item)} inverted> Add to cart </CustomButton>
    </div>

)}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)) // what we are doing is simply inserting a fn called addItem as a
    // prop in the collectionItem, which when triggered will pass the item as payload to a type as addItem
    //  which will be further to our store.
});

export default connect(null, mapDispatchToProps)(CollectionItem);