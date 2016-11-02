'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideMenu = exports.showMenu = undefined;

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var showMenu = exports.showMenu = function showMenu(state, _ref) {
    var _fromJS;

    var stateKey = _ref.stateKey,
        id = _ref.id;
    return state.setIn([stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, id, true), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));
};

var hideMenu = exports.hideMenu = function hideMenu(state, _ref2) {
    var _fromJS2;

    var stateKey = _ref2.stateKey,
        id = _ref2.id;
    return state.setIn([stateKey], (0, _immutable.fromJS)((_fromJS2 = {}, _defineProperty(_fromJS2, id, false), _defineProperty(_fromJS2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS2)));
};