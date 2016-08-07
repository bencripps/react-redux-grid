'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showMenu = showMenu;
exports.hideMenu = hideMenu;

var _ActionTypes = require('../../../constants/ActionTypes');

function showMenu(_ref) {
    var id = _ref.id;
    var stateKey = _ref.stateKey;

    return { type: _ActionTypes.SHOW_MENU, id: id, stateKey: stateKey };
}

function hideMenu(_ref2) {
    var id = _ref2.id;
    var stateKey = _ref2.stateKey;

    return { type: _ActionTypes.HIDE_MENU, id: id, stateKey: stateKey };
}