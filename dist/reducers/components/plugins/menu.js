'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = menu;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function menu() {
    var _fromJS;

    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.SHOW_MENU:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, action.id, true), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));

        case _ActionTypes.HIDE_MENU:
            if (action.id) {
                var _fromJS2;

                return state.setIn([action.stateKey], (0, _immutable.fromJS)((_fromJS2 = {}, _defineProperty(_fromJS2, action.id, false), _defineProperty(_fromJS2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS2)));
            }

            return state.setIn([action.stateKey], (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() }));

        default:
            return state;
    }
}