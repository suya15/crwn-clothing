import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

// handled in container pattern
// const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        // const { fetchCollectionsStartAsync } = this.props;
        const { fetchCollectionsStart } = this.props;

        // asynchronus redux thunk method
        // fetchCollectionsStartAsync();

        //sagas mthod
        fetchCollectionsStart();


        // this all code is moved to reducer to increase the reusability

        // const { updateCollections } = this.props;
        // const collectionRef = firestore.collection('collections');

        // // rest API service given by firebase
        // // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-8c523/databases/(default)/documents/collections')
        // // .then(response => response.json())
        // // .then(collections => console.log(collections))

        // // promise pattern 
        // collectionRef.get().then(snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // });

        // // observable pattern which is implemented by snapshot syntax of firebase
        // // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        // //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // //     updateCollections(collectionsMap);
        // //     this.setState({ loading: false });
        // // })
    }

    render() {
        const { match } = this.props;

        return (<div className='shop-page'>
            {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
            {/* using render to pass the props to the component with higher order output */}
            {/* <Route
                exact path={`${match.path}`}
                render={(props) => <CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} /> */}

            <Route
                exact path={`${match.path}`}
                component={CollectionOverviewContainer} />

            {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
            {/* <Route
                path={`${match.path}/:collectionId`}
                render={(props) => <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} /> */}

            <Route
                path={`${match.path}/:collectionId`}
                component={CollectionPageContainer} />

        </div>)
    }
};

// const mapStateToProps = createStructuredSelector({
//     isCollectionFetching: selectIsCollectionFetching,
//     isCollectionsLoaded: selectIsCollectionsLoaded
// });

const mapDispatchToProps = dispatch => ({
    // updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
    // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())

});


export default connect(null , mapDispatchToProps)(ShopPage);
