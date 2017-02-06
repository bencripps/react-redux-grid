'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _redux.compose;

function configureStore(initialState) {
    var store = (0, _redux.createStore)(_reducers2.default, initialState, composeEnhancers((0, _redux.applyMiddleware)(_reduxThunk2.default)));
    if (module.hot) {
        module.hot.accept('../reducers', function () {
            var nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}