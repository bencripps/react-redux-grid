'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissError = exports.errorOccurred = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var errorOccurred = exports.errorOccurred = function errorOccurred(state, _ref) {
    var error = _ref.error,
        stateKey = _ref.stateKey;
    return state.setIn([stateKey], new _records.ErrorHandler({
        error: error,
        errorOccurred: true,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var dismissError = exports.dismissError = function dismissError(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return state.setIn([stateKey], new _records.ErrorHandler({
        error: '',
        errorOccurred: false,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};