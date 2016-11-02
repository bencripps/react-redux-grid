'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissError = exports.errorOccurred = undefined;

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

var errorOccurred = exports.errorOccurred = function errorOccurred(state, _ref) {
    var error = _ref.error,
        stateKey = _ref.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        error: error,
        errorOccurred: true,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var dismissError = exports.dismissError = function dismissError(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        error: '',
        errorOccurred: false,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};