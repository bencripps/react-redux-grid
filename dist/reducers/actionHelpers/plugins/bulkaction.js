'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = undefined;

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

var removeToolbar = exports.removeToolbar = function removeToolbar(state, _ref) {
    var stateKey = _ref.stateKey;
    var value = _ref.value;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        isRemoved: value,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};