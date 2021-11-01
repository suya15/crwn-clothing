import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";


import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from '../collections-overview/collections-overview.component';


const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

// const CollectionOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionOverview));
// above and below are totally equivalent
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner)(CollectionOverview);

    export default CollectionOverviewContainer;