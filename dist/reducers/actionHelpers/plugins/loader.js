'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setLoading = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var setLoading = exports.setLoading = function setLoading(state, _ref) {
    var stateKey = _ref.stateKey,
        loadingState = _ref.state;
    return state.setIn([stateKey], new _records.Loader({
        isLoading: loadingState,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};