'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.nameFromDataIndex = exports.getValueFromDataIndexArr = exports.setDataAtDataIndex = exports.getRowKey = exports.setKeysInData = exports.getData = undefined;

var _immutable = require('immutable');

var _camelize = require('./camelize');

var getData = exports.getData = function getData() {
    var rowData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var columns = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var colIndex = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];


    var column = columns[colIndex];

    if (!column) {
        return undefined;
    }

    var dataIndex = column.dataIndex || null;

    if (!dataIndex) {
        throw new Error('No dataIndex found on column', column);
    }

    if (typeof dataIndex === 'string') {
        return rowData && rowData[dataIndex] !== undefined ? rowData[dataIndex] : null;
    } else if (Array.isArray(dataIndex)) {
        return getValueFromDataIndexArr(rowData, dataIndex);
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
    var val = rowValues._key;

    if (uniqueCol.length > 1) {
        throw new Error('Only one column can declare createKeyFrom');
    }

    if (uniqueCol.length > 0) {
        var dataIndex = nameFromDataIndex(uniqueCol[0]);
        val = rowValues && rowValues[dataIndex] ? rowValues[dataIndex] : rowValues._key;
    }

    if (suffix) {
        val = val + '-' + suffix;
    }

    return val;
};

var setDataAtDataIndex = exports.setDataAtDataIndex = function setDataAtDataIndex() {
    var rowData = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var dataIndex = arguments[1];
    var val = arguments[2];


    if (typeof dataIndex === 'string') {
        rowData[dataIndex] = val;
        return rowData;
    }

    var temp = rowData;

    for (var i = 0; i < dataIndex.length - 1; i++) {
        temp = temp[dataIndex[i]];
    }

    if (!temp[dataIndex[[dataIndex.length - 1]]]) {
        throw new Error('Invalid key path');
    }

    temp[dataIndex[dataIndex.length - 1]] = val;

    return rowData;
};

var getValueFromDataIndexArr = exports.getValueFromDataIndexArr = function getValueFromDataIndexArr(rowData, dataIndex) {
    var temp = rowData;

    for (var i = 0; i < dataIndex.length; i++) {

        if (!temp[dataIndex[i]]) {
            // preferring silent failure on get
            // but we throw an error on the update
            // if the key path is invalid
            return '';
        }

        temp = temp[dataIndex[i]];
    }

    return temp;
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