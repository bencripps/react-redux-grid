'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeToolbar = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var removeToolbar = exports.removeToolbar = function removeToolbar(state, _ref) {
    var stateKey = _ref.stateKey,
        value = _ref.value;
    return state.setIn([stateKey], new _records.BulkAction({
        isRemoved: value,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};