'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoaderState = setLoaderState;

var _ActionTypes = require('../../../constants/ActionTypes');

function setLoaderState(_ref) {
    var state = _ref.state;
    var stateKey = _ref.stateKey;

    return { type: _ActionTypes.SET_LOADING_STATE, state: state, stateKey: stateKey };
}