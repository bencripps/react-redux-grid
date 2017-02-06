'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var num = 0;

var REDUCER_KEYS = {
    BulkActions: 'bulkaction',
    DataSource: 'dataSource',
    Editor: 'editor',
    ErrorHandler: 'errorhandler',
    Grid: 'grid',
    Loader: 'loader',
    Menu: 'menu',
    Pager: 'pager',
    Selection: 'selection'
};

var generateLastUpdate = exports.generateLastUpdate = function generateLastUpdate() {
    return ++num;
};

var resetLastUpdate = exports.resetLastUpdate = function resetLastUpdate() {
    num = 0;
};

var getLastUpdate = exports.getLastUpdate = function getLastUpdate(store, key) {
    var reducerKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : REDUCER_KEYS;

    var state = store.getState();

    var keys = Object.keys(reducerKeys);

    if (!keys.length) {
        reducerKeys = REDUCER_KEYS;
        keys = Object.keys(REDUCER_KEYS);
    }

    return keys.reduce(function (prev, reducerAccessor) {
        var reducerKey = reducerKeys[reducerAccessor];
        var stateMap = typeof state.get === 'function' ? state.get(reducerKey) : state[reducerKey];
        if (stateMap && stateMap.toJS) {
            prev[reducerKey] = stateMap.getIn([key, 'lastUpdate']);
        }
        return prev;
    }, {});
};