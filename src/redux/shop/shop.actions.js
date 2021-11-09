import ShopActionTypes from "./shop.types";

// just triggered the fetching true
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

// making the call after success
export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

// action call in case of api call failure
export const fetchCollectionsFailure = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})


// this is used in the component for the api call (thunk method)
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//         const collectionRef = firestore.collection('collections');
//         // making the fetching true
//         dispatch(fetchCollectionsStart());

//         collectionRef.get().then(snapshot => {
//             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//             // updating the redux storage after collection success
//             dispatch(fetchCollectionsSuccess(collectionsMap));
//         }).catch(
//             // dispatching in case of failure
//             error => dispatch(fetchCollectionsFailure(error.message))
//         );
//     }
// };