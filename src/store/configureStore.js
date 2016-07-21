import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import logger from 'redux-diff-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk, logger
    )(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
