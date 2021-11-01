import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

// we dont need this to improve time comp by replacing it with object, in shop data array is converted into object 
// const COLLECTION_ID_MAP = {
//     hats: 1,
//     sneakers: 2,
//     jackets: 3,
//     womens: 4,
//     mens: 5
// }

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

// selector was not able to get memoized due to the dynamically changing collectionUrlParam
// export const selectCollection = collectionUrlParam =>
//     createSelector(
//         [selectShopCollections],
//         collections => collections.find(
//             collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
//         )
//     );

// here we have used memoize from lodash to solve the issue of not memoizing the situation
export const selectCollection = memoize(collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        // this commented to improve time comp by replacing it with object, in shop data array is converted into object
        // collections => collections.find(
        //     collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
        // )
        collections => collections ?  collections[collectionUrlParam] : null
    ));

  // for collection preview we are getting collection array from collection object structure, 
  // coverting hashed object structure to array with index as id which will be used as an index, conversion is done for array.map
  export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

// selector written to keep in account the isFetching variable for api call and loading of shop
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);


// amazing selector for getting the boolean value from a value presense 
// which will be further used to overcome the problem due to unavailability of values 
// coz of occurence of render before component did mount
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)
  