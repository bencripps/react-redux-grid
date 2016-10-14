'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var removeToolbar = exports.removeToolbar = function removeToolbar(_ref) {
    var state = _ref.state;
    var stateKey = _ref.stateKey;
    return {
        type: _ActionTypes.REMOVE_TOOLBAR, value: state, stateKey: stateKey
    };
};