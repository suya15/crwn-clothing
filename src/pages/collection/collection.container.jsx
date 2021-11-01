import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import CollectionPage from '../collection/collection.component';

const mapStateToProps = createStructuredSelector({
    // below will still memoize our selector, instead of assigning directly a selector 
    // we have given this a function, which will receive a state
    isLoading: state => !selectIsCollectionsLoaded(state)
});

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;