'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoaderState = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var setLoaderState = exports.setLoaderState = function setLoaderState(_ref) {
    var state = _ref.state;
    var stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.SET_LOADING_STATE, state: state, stateKey: stateKey
    };
};