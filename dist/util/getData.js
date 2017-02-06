'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nameFromDataIndex = exports.getValueFromDataIndexArr = exports.setDataAtDataIndex = exports.getRowKey = exports.setKeysInData = exports.getData = undefined;

var _immutable = require('immutable');

var _camelize = require('./camelize');

var getData = exports.getData = function getData() {
    var row = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _immutable.Map();
    var columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var colIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var editorValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


    if (!row.get) {
        row = (0, _immutable.fromJS)(row);
    }

    var column = columns[colIndex];

    if (!column) {
        return undefined;
    }

    var dataIndex = column.dataIndex || null;

    if (!dataIndex) {
        throw new Error('No dataIndex found on column', column);
    }

    if (editorValues && editorValues.get && editorValues.get(dataIndex) !== undefined) {
        return editorValues.get(dataIndex);
    }

    if (typeof dataIndex === 'string') {
        var val = row && row.get && row.get(dataIndex) !== undefined ? row.get(dataIndex) : null;

        return val && val.toJS ? val.toJS() : val;
    } else if (Array.isArray(dataIndex)) {
        var _val = getValueFromDataIndexArr(row, dataIndex);
        return _val && _val.toJS ? _val.toJS() : _val;
    }
};

var setKeysInData = exports.setKeysInData = function setKeysInData(data) {

    if (_immutable.List.isList(data)) {

        if (data.getIn([0, '_key'])) {
            return data;
        }

        return data.map(function (item, i) {
            return item.set('_key', 'row-' + i);
        });
    }

    if (!data || !Array.isArray(data)) {
        return (0, _immutable.List)([]);
    }

    if (data[0] && data[0]._key === undefined) {
        data.forEach(function (row, i) {
            row._key = 'row-' + i;
        });
    }

    return (0, _immutable.fromJS)(data);
};

var getRowKey = exports.getRowKey = function getRowKey(columns, rowValues, suffix) {

    var uniqueCol = columns.filter(function (col) {
        return col.createKeyFrom;
    });
    var val = rowValues.get('_key');

    if (uniqueCol.length > 1) {
        throw new Error('Only one column can declare createKeyFrom');
    }

    if (uniqueCol.length > 0) {
        var dataIndex = nameFromDataIndex(uniqueCol[0]);
        val = rowValues && rowValues.get(dataIndex) ? rowValues.get(dataIndex) : rowValues.get('_key');
    }

    if (suffix) {
        val = val + '-' + suffix;
    }

    return val;
};

var setDataAtDataIndex = exports.setDataAtDataIndex = function setDataAtDataIndex(row, dataIndex, val) {

    if (!row.toJS) {
        row = (0, _immutable.fromJS)(row);
    }

    if (typeof dataIndex === 'string') {
        return row.set(dataIndex, val);
    }

    if (row.getIn(dataIndex)) {
        return row.setIn(dataIndex, val);
    }

    throw new Error('Invalid key path');
};

var getValueFromDataIndexArr = exports.getValueFromDataIndexArr = function getValueFromDataIndexArr(row, dataIndex) {
    var val = row.getIn(dataIndex);

    return val !== undefined ? val : '';
};

var nameFromDataIndex = exports.nameFromDataIndex = function nameFromDataIndex(column) {

    if (!column) {
        return '';
    }

    if (typeof column.dataIndex === 'string') {
        return column.dataIndex;
    }

    if (Array.isArray(column.dataIndex)) {
        return column.dataIndex[column.dataIndex.length - 1];
    }

    if (!column.dataIndex) {
        return (0, _camelize.camelize)(column.name);
    }
};