import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items.filter((item, idx) => idx < 4)
            .map((item) => (
                <CollectionItem  key={item.id} item={item} />
            ))}
        </div>
    </div>
);

export default CollectionPreview;

// import React from 'react';
// import './collection-preview.styles.scss';
// import CollectionItem from '../collection-item/collection-item.component';
// import CustomButton from '../custom-button/custom-button.component';
// import { withRouter } from 'react-router';

// const CollectionPreview = ({ title, items, history, routeName, match }) => (
//     <div className='collection-preview'>
//         <h1 className='title'>{title.toUpperCase()}</h1>
//         <div className='preview'>
//             {items.filter((item, idx) => idx < 4)
//                 .map((item) => (
//                     <CollectionItem key={item.id} item={item} />
//                 ))}
//         </div>
//         <div className="show-all">
//             <CustomButton onClick={() => {
//                 history.push(`${match.url}/${routeName}`);
//             }} >Show All</CustomButton>
//         </div>
//     </div>
// );

// export default withRouter(CollectionPreview);