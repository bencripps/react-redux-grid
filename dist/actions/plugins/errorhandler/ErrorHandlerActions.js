'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dismissError = dismissError;

var _ActionTypes = require('../../../constants/ActionTypes');

function dismissError(_ref) {
    var stateKey = _ref.stateKey;

    return { type: _ActionTypes.DISMISS_ERROR, stateKey: stateKey };
}