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
        collections => collections[collectionUrlParam]
    ));

  // for collection preview we are getting collection array from collection object structure
  export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => Object.keys(collections).map(key => collections[key])
)
  