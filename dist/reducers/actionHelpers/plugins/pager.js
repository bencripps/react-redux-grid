'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pageRemote = exports.pageLocal = undefined;

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var pageLocal = exports.pageLocal = function pageLocal(state, _ref) {
    var pageIndex = _ref.pageIndex,
        stateKey = _ref.stateKey;
    return state.mergeIn([stateKey], new _records.Pager({
        pageIndex: pageIndex,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var pageRemote = exports.pageRemote = function pageRemote(state, _ref2) {
    var pageIndex = _ref2.pageIndex,
        stateKey = _ref2.stateKey;
    return state.mergeIn([stateKey], new _records.Pager({
        pageIndex: pageIndex,
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};