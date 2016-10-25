'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoading = undefined;

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

var setLoading = exports.setLoading = function setLoading(state, _ref) {
    var stateKey = _ref.stateKey;
    var loadingState = _ref.state;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        isLoading: loadingState,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};