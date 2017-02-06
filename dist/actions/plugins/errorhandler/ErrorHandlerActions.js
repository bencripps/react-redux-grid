'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissError = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var dismissError = exports.dismissError = function dismissError(_ref) {
    var stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.DISMISS_ERROR, stateKey: stateKey
    };
};