'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleChangeFunc = exports.setDisabled = exports.isRowValid = exports.isCellValid = exports.removeEditorState = exports.repositionEditor = exports.rowValueChange = exports.setData = exports.editRow = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getData = require('./../../../util/getData');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var editRow = exports.editRow = function editRow(state, _ref) {
    var _fromJS;

    var columns = _ref.columns;
    var editMode = _ref.editMode;
    var rowIndex = _ref.rowIndex;
    var rowId = _ref.rowId;
    var stateKey = _ref.stateKey;
    var top = _ref.top;
    var isCreate = _ref.isCreate;
    var values = _ref.values;


    var isValid = isRowValid(columns, values);
    var iOverrides = state.getIn([stateKey, rowId, 'overrides']) ? state.getIn([stateKey, rowId, 'overrides']).toJS() : {};

    columns.forEach(function (col, i) {
        var val = (0, _getData.getData)(values, columns, i);
        var dataIndex = col.dataIndex;

        // setting disabled
        iOverrides[dataIndex] = iOverrides[dataIndex] || {};
        iOverrides[dataIndex].disabled = setDisabled(col, val, values);
    });

    var operation = editMode === 'inline' ? 'setIn' : 'mergeIn';

    return state[operation]([stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, rowId, {
        key: rowId,
        values: values,
        rowIndex: rowIndex,
        top: top,
        valid: isValid,
        isCreate: isCreate || false,
        overrides: iOverrides
    }), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));
};

var setData = exports.setData = function setData(state, _ref2) {
    var data = _ref2.data;
    var editMode = _ref2.editMode;
    var stateKey = _ref2.stateKey;

    if (editMode === 'grid') {

        var keyedData = (0, _getData.setKeysInData)(data);
        var editorData = keyedData.reduce(function (prev, curr, i) {
            return prev.set(curr.get('_key'), (0, _immutable.fromJS)({
                key: curr.get('_key'),
                values: curr,
                rowIndex: i,
                top: null,
                valid: null,
                isCreate: false,
                overrides: {}
            }));
        }, (0, _immutable.Map)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() }));

        return state.mergeIn([stateKey], editorData);
    }

    return state;
};

var rowValueChange = exports.rowValueChange = function rowValueChange(state, _ref3) {
    var column = _ref3.column;
    var columns = _ref3.columns;
    var value = _ref3.value;
    var rowId = _ref3.rowId;
    var stateKey = _ref3.stateKey;


    var previousValues = state.getIn([stateKey, rowId, 'values']) ? state.getIn([stateKey, rowId, 'values']).toJS() : {};
    var overrides = state.getIn([stateKey, rowId, 'overrides']) ? state.getIn([stateKey, rowId, 'overrides']).toJS() : {};

    var rowValues = (0, _getData.setDataAtDataIndex)(previousValues, column.dataIndex, value);

    columns.forEach(function (col, i) {
        var val = (0, _getData.getData)(rowValues, columns, i);
        var dataIndex = col.dataIndex;

        // interpreting `change func` to set final values
        // happens first, due to other validation
        rowValues = handleChangeFunc(col, rowValues);

        // setting default value
        if (col.defaultValue !== undefined && val === undefined || val === null) {
            (0, _getData.setDataAtDataIndex)(rowValues, dataIndex, col.defaultValue);
        }

        // setting disabled
        overrides[dataIndex] = overrides[dataIndex] || {};
        overrides[dataIndex].disabled = setDisabled(col, val, rowValues);
    });

    var valid = isRowValid(columns, rowValues);

    state = state.mergeIn([stateKey, rowId], {
        values: rowValues,
        previousValues: state.getIn([stateKey, rowId, 'values']),
        valid: valid,
        overrides: overrides
    });

    return state.setIn([stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)());
};

var repositionEditor = exports.repositionEditor = function repositionEditor(state, _ref4) {
    var rowId = _ref4.rowId;
    var stateKey = _ref4.stateKey;
    var top = _ref4.top;

    var newState = state.mergeIn([stateKey, rowId], {
        top: top
    });

    return newState.mergeIn([stateKey], { lastUpdate: (0, _lastUpdate.generateLastUpdate)() });
};

var removeEditorState = exports.removeEditorState = function removeEditorState(state, _ref5) {
    var stateKey = _ref5.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() }));
};

// helpers
var isCellValid = exports.isCellValid = function isCellValid(_ref6, value, values) {
    var validator = _ref6.validator;

    if (!validator || !(typeof validator === 'undefined' ? 'undefined' : _typeof(validator)) === 'function') {
        return true;
    }

    return validator({ value: value, values: values });
};

var isRowValid = exports.isRowValid = function isRowValid(columns, rowValues) {
    for (var i = 0; i < columns.length; i++) {

        var col = columns[i];
        var val = isCellValid(col, (0, _getData.getData)(rowValues, columns, i), rowValues);

        if (!val) {
            return false;
        }
    }

    return true;
};

var setDisabled = exports.setDisabled = function setDisabled() {
    var col = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var value = arguments[1];
    var values = arguments[2];


    if (col.disabled === true || col.disabled === 'false') {
        return col.disabled;
    }

    if (typeof col.disabled === 'function') {
        return col.disabled({ column: col, value: value, values: values });
    }

    return false;
};

var handleChangeFunc = exports.handleChangeFunc = function handleChangeFunc(col, rowValues) {

    if (!col.change || !_typeof(col.change) === 'function') {
        return rowValues;
    }

    var overrideValue = col.change({ values: rowValues }) || {};

    Object.keys(overrideValue).forEach(function (k) {
        rowValues[k] = overrideValue[k];
    });

    return rowValues;
};