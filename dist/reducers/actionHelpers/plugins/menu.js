'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hideMenu = exports.showMenu = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var showMenu = exports.showMenu = function showMenu(state, _ref) {
    var _ref2;

    var stateKey = _ref.stateKey,
        id = _ref.id;
    return state.setIn([stateKey], new _records.Menu((_ref2 = {}, _defineProperty(_ref2, id, true), _defineProperty(_ref2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref2)));
};

var hideMenu = exports.hideMenu = function hideMenu(state, _ref3) {
    var _ref4;

    var stateKey = _ref3.stateKey,
        id = _ref3.id;
    return state.setIn([stateKey], new _records.Menu((_ref4 = {}, _defineProperty(_ref4, id, false), _defineProperty(_ref4, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref4)));
};