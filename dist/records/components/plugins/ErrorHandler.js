'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var ErrorHandler = (0, _immutable.Record)({
    error: '',
    errorOccurred: false,
    lastUpdate: 0
});

exports.default = ErrorHandler;