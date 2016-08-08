'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = errorhandler;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

function errorhandler() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.ERROR_OCCURRED:
            return state.set(action.stateKey, (0, _immutable.fromJS)({
                error: action.error,
                errorOccurred: true,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        case _ActionTypes.DISMISS_ERROR:
            return state.set(action.stateKey, (0, _immutable.fromJS)({
                error: '',
                errorOccurred: false,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            }));

        default:
            return state;
    }
}