'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var DataSource = (0, _immutable.Record)({
    data: (0, _immutable.List)(),
    proxy: (0, _immutable.List)(),
    total: 0,
    treeData: (0, _immutable.Map)(),
    currentRecords: (0, _immutable.List)(),
    isEditing: false,
    lastUpdate: 0
});

exports.default = DataSource;