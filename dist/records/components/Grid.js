'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var Grid = (0, _immutable.Record)({
    columns: (0, _immutable.List)(),
    headerHidden: false,
    lastUpdate: 0
});

exports.default = Grid;