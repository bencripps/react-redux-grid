'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = pager;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _lastUpdate = require('./../../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({
    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
});

function pager() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];


    switch (action.type) {

        case _ActionTypes.PAGE_LOCAL:
            return state.mergeIn([action.stateKey], {
                pageIndex: action.pageIndex,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        case _ActionTypes.PAGE_REMOTE:
            return state.mergeIn([action.stateKey], {
                pageIndex: action.pageIndex,
                lastUpdate: (0, _lastUpdate.generateLastUpdate)()
            });

        default:
            return state;
    }
}