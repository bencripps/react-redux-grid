"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/*
* central function to retrieve state from reducer
* used inside of mapStateToProps by grid and other plugins
* @returns {object} state

* will not return immutable object, only plain JS object

* if a dynamic reducerKey is passed, it will favor that key
* over the build in grid keys

*/

var stateGetter = exports.stateGetter = function stateGetter(state, props, key, entry) {

    if (props && props.reducerKeys && Object.keys(props.reducerKeys).length > 0 && props.reducerKeys[key]) {

        var dynamicKey = props.reducerKeys[key];
        var dynamicState = get(state, dynamicKey, entry);

        return dynamicState && dynamicState.toJS ? dynamicState.toJS() : dynamicState;
    }

    var val = get(state, key, entry);

    if (val) {
        return val.toJS ? val.toJS() : val;
    }

    return null;
};

var get = exports.get = function get(state, key, entry) {
    return state && state[key] && state[key].get && state[key].get(entry) ? state[key].get(entry) : null;
};