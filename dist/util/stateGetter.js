'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

var stateGetter = exports.stateGetter = function stateGetter(state, props, key, entry) {

    if (props && props.reducerKeys && Object.keys(props.reducerKeys).length > 0 && props.reducerKeys[key]) {

        var dynamicKey = props.reducerKeys[key];
        var dynamicState = get(state, dynamicKey, entry);

        return dynamicState;
    }

    var val = get(state, key, entry);

    if (val) {
        return val;
    }

    return null;
};

var get = exports.get = function get(state, key, entry) {

    if (!state) {
        return null;
    }

    var isImmutable = typeof state.get === 'function';
    var stateItem = isImmutable ? state.get(key) : state[key];

    if (!stateItem) {
        return null;
    }

    return stateItem.get(entry);
};