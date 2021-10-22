import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import CollectionPage from '../collection/collection.component';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true
    };

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        // rest API service given by firebase
        // fetch('https://firestore.googleapis.com/v1/projects/crwn-db-8c523/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections))

        // promise pattern 
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading: false });
        });

        // observable pattern which is implemented by snapshot syntax of firebase
        // this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        //     updateCollections(collectionsMap);
        //     this.setState({ loading: false });
        // })
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (<div className='shop-page'>
            {/* <Route exact path={`${match.path}`} component={CollectionsOverview} /> */}
            {/* using render to pass the props to the component with higher order output */}
            <Route
                exact path={`${match.path}`}
                render={(props) => <CollectionOverviewWithSpinner isLoading={loading} {...props} />} />

            {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
            <Route 
            path={`${match.path}/:collectionId`} 
            render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />

        </div>)
    }
};

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});


export default connect(null, mapDispatchToProps)(ShopPage);
