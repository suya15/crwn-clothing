import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// we are importing local storage through redux -persist here, we can somehow do it foe session storage too
import storage from "redux-persist/lib/storage";

import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import userReducer from "./user/user.reducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
};

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

// here we are exporting the modified rootReducer with  persitence capabilities
export default persistReducer(persistConfig, rootReducer);