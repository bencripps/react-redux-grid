'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = bulkaction;

var _immutable = require('immutable');

var _ActionTypes = require('./../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function bulkaction() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.REMOVE_TOOLBAR:
            return state.setIn([action.stateKey], (0, _immutable.fromJS)({
                isRemoved: action.value,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        default:
            return state;
    }
}