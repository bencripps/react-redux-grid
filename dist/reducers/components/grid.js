'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gridState;

var _immutable = require('immutable');

var _ActionTypes = require('./../../constants/ActionTypes');

var _lastUpdate = require('./../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function gridState() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.HIDE_HEADER:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                headerHidden: action.headerHidden,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_COLUMNS:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.SET_SORT_DIRECTION:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.RESIZE_COLUMNS:
            return state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                columns: action.columns,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        default:

            return state;
    }
}