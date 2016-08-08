'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = removeToolbar;

var _ActionTypes = require('../../../constants/ActionTypes');

function removeToolbar(_ref) {
    var state = _ref.state;
    var stateKey = _ref.stateKey;

    return { type: _ActionTypes.REMOVE_TOOLBAR, value: state, stateKey: stateKey };
}