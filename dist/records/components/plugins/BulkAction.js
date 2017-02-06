'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var BulkAction = (0, _immutable.Record)({
    isRemoved: null,
    lastUpdate: 0
});

exports.default = BulkAction;