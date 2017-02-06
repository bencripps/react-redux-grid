'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Pager = (0, _immutable.Record)({
    pageIndex: 0,
    lastUpdate: 0
});

exports.default = Pager;