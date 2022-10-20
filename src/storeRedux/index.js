import {combineReducers, applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {breakingBadReducer} from './reducers/breakingBadReducer';
import { persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    breakingBadReducer
})

const persistConfig = {
    key: 'breakingBad',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
export default store;