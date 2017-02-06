'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Loader = (0, _immutable.Record)({
    isLoading: false,
    lastUpdate: 0
});

exports.default = Loader;