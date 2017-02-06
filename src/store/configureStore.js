import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
    const logger = createLogger();
    const createStoreWithMiddleware = applyMiddleware(
        thunk,
        logger
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
