'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Editor = (0, _immutable.Record)({
    key: null,
    values: (0, _immutable.Map)(),
    rowIndex: null,
    top: null,
    valid: null,
    isCreate: null,
    overrides: (0, _immutable.Map)(),
    previousValues: (0, _immutable.Map)(),
    lastUpdate: 0
});

exports.default = Editor;