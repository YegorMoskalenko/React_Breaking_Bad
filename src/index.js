import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store, {persistor} from './storeRedux';
import {PersistGate} from "redux-persist/integration/react";
import {rootStore} from "./storeMobx";
// import {Provider} from "mobx-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>

    // <Provider store={rootStore}>
    //     <App />
    // </Provider>
);