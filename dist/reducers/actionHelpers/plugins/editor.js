'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleChangeFunc = exports.setDisabled = exports.isRowValid = exports.isCellValid = exports.removeEditorState = exports.repositionEditor = exports.rowValueChange = exports.setData = exports.editRow = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require('immutable');

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

var _getData = require('./../../../util/getData');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var editRow = exports.editRow = function editRow(state, _ref) {
    var _fromJS;

    var columns = _ref.columns,
        editMode = _ref.editMode,
        rowIndex = _ref.rowIndex,
        rowId = _ref.rowId,
        stateKey = _ref.stateKey,
        top = _ref.top,
        isCreate = _ref.isCreate,
        values = _ref.values;


    if (!values.toJS) {
        values = (0, _immutable.fromJS)(values);
    }

    var isValid = isRowValid(columns, values);

    var overrides = state.getIn([stateKey, rowId, 'overrides']) ? state.getIn([stateKey, rowId, 'overrides']) : new _immutable.Map();

    columns.forEach(function (col, i) {
        var val = (0, _getData.getData)(values, columns, i);
        var dataIndex = col.dataIndex;

        // setting disabled
        if (!overrides.get(dataIndex)) {
            overrides = overrides.set(dataIndex, new _immutable.Map());
        }

        overrides = overrides.setIn([dataIndex, 'disabled'], setDisabled(col, val, values));
    });

    var operation = editMode === 'inline' ? 'setIn' : 'mergeIn';

    return state[operation]([stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, rowId, new _records.Editor({
        key: rowId,
        values: (0, _immutable.fromJS)(values),
        rowIndex: rowIndex,
        top: top,
        valid: isValid,
        isCreate: isCreate || false,
        overrides: overrides
    })), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));
};

var setData = exports.setData = function setData(state, _ref2) {
    var data = _ref2.data,
        editMode = _ref2.editMode,
        stateKey = _ref2.stateKey;

    if (editMode === 'grid') {

        var keyedData = (0, _getData.setKeysInData)(data);
        var editorData = keyedData.reduce(function (prev, curr, i) {
            return prev.set(curr.get('_key'), new _records.Editor({
                key: curr.get('_key'),
                values: curr,
                rowIndex: i,
                top: null,
                valid: null,
                isCreate: false,
                overrides: (0, _immutable.Map)()
            }));
        }, (0, _immutable.Map)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() }));

        return state.mergeIn([stateKey], editorData);
    }

    return state;
};

var rowValueChange = exports.rowValueChange = function rowValueChange(state, _ref3) {
    var column = _ref3.column,
        columns = _ref3.columns,
        value = _ref3.value,
        rowId = _ref3.rowId,
        stateKey = _ref3.stateKey;


    var colTriggeringChange = (0, _getData.nameFromDataIndex)(column);
    var previousEditorState = state.getIn([stateKey, rowId]);
    var previousValues = previousEditorState ? previousEditorState.values : new _immutable.Map();

    var overrides = previousEditorState ? previousEditorState.overrides : new _immutable.Map();

    var rowValues = (0, _getData.setDataAtDataIndex)(previousValues, column.dataIndex, value);

    columns.forEach(function (col, i) {
        var val = (0, _getData.getData)(rowValues, columns, i);
        var dataIndex = (0, _getData.nameFromDataIndex)(col);

        // interpreting `change func` to set final values
        // happens first, due to other validation
        // need to turn back to immutable, since data is
        // being retrieved externally
        rowValues = (0, _immutable.fromJS)(handleChangeFunc(col, rowValues, colTriggeringChange));

        // setting default value
        if (col.defaultValue !== undefined && (val === undefined || val === null)) {
            rowValues = (0, _getData.setDataAtDataIndex)(rowValues, dataIndex, col.defaultValue);
        }

        // setting disabled
        if (!overrides || !overrides.get) {
            overrides = new _immutable.Map();
        }

        if (!overrides.get(dataIndex)) {
            overrides = overrides.set(dataIndex, (0, _immutable.Map)());
        }

        overrides = overrides.setIn([dataIndex, 'disabled'], setDisabled(col, val, rowValues));
    });

    var valid = isRowValid(columns, rowValues);

    var record = state.getIn([stateKey, rowId]) || new _records.Editor();
    var updated = record.merge({
        values: rowValues,
        previousValues: record.values,
        valid: valid,
        overrides: overrides
    });

    state = state.setIn([stateKey, rowId], updated);

    return state.setIn([stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)());
};

var repositionEditor = exports.repositionEditor = function repositionEditor(state, _ref4) {
    var rowId = _ref4.rowId,
        stateKey = _ref4.stateKey,
        top = _ref4.top;

    var record = state.getIn([stateKey, rowId]);
    var updated = record.merge({ top: top });
    var newState = state.mergeIn([stateKey, rowId], updated);

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

    var vals = values && values.toJS ? values.toJS() : values;

    return validator({ value: value, values: vals });
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

        var vals = values && values.toJS ? values.toJS() : values;

        return col.disabled({
            column: col,
            value: value,
            values: vals
        });
    }

    return false;
};

var handleChangeFunc = exports.handleChangeFunc = function handleChangeFunc(col, rowValues, colTriggeringChange) {

    var vals = rowValues && rowValues.toJS ? rowValues.toJS() : rowValues;

    if (!col.change || !_typeof(col.change) === 'function') {
        return vals;
    }

    var overrideValue = col.change({ values: vals, eventSource: col }) || {};

    Object.keys(overrideValue).forEach(function (k) {
        // if the change is originating
        // from a the column that we want to override
        // ignore that specific change value
        if (k !== colTriggeringChange) {
            vals[k] = overrideValue[k];
        }
    });

    return vals;
};