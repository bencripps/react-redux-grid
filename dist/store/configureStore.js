'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _reduxDiffLogger = require('redux-diff-logger');

var _reduxDiffLogger2 = _interopRequireDefault(_reduxDiffLogger);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore(initialState) {
    var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxDiffLogger2.default)(_redux.createStore);
    var store = createStoreWithMiddleware(_reducers2.default, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', function () {
            var nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}