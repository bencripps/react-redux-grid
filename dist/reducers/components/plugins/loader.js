'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loader;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({
    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
});

function loader() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.SET_LOADING_STATE:
            return state.mergeIn([action.stateKey], {
                isLoading: action.state,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        default:
            return state;
    }
}