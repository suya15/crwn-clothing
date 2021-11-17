import React, { useEffect } from 'react';

import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import './collection.styles.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const CollectionPage = () => {

    const { collectionId } = useParams();
    const collection = useSelector(selectCollection(collectionId));
    const { title, items } = collection;

    return (
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items?.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
};


export default CollectionPage;



// without hooks


// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';

// // import { firestore } from '../../firebase/firebase.utils';
// import { selectCollection } from '../../redux/shop/shop.selectors';
// import CollectionItem from '../../components/collection-item/collection-item.component';
// import './collection.styles.scss';

// // const CollectionPage = ({match}) => {

// //     // by this console log we can see the dynamic pass of the nested routes...
// //     console.log(match);

// //     return (
// //     <div className="collection-page">
// //         <h2>Collection Page</h2>
// //     </div>
// // )};

// const CollectionPage = ({collection}) => {

//     // mimicking componentWillUnmount
//     // useEffect(() => {
//     //     console.log('i am subscribing');
//     //     const unsubscribeFromCollection = firestore.collection('collections').onSnapshot(
//     //         snapshot => console.log(snapshot)
//     //     );

//     //     return () => {
//     //         console.log('i am unsubscribing');
//     //         unsubscribeFromCollection();
//     //     };
//     // }, []);


//     const { title, items } = collection;
//     return (
//     <div className="collection-page">
//         <h2 className="title">{title}</h2>
//         <div className="items">
//             {
//                 items?.map(item => (
//                     <CollectionItem key={item.id} item={item} />
//                 ))
//             }
//         </div>
//     </div>
// )};


// // this mapStateToProps is different it explains how we can use the component props to be passed to selectors
// const mapStateToProps = (state, ownProps) => ({
//     collection: selectCollection(ownProps.match.params.collectionId)(state)
// });



// export default connect(mapStateToProps)(CollectionPage);