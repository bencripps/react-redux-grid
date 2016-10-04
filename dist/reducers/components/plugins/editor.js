'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleChangeFunc = exports.setDisabled = exports.isRowValid = exports.isCellValid = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = editor;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _getData = require('./../../../util/getData');

var _lastUpdate = require('./../../../util/lastUpdate');

var initialState = (0, _immutable.fromJS)({
    lastUpdate: (0, _lastUpdate.generateLastUpdate)()
});

var isCellValid = exports.isCellValid = function isCellValid(_ref, value, values) {
    var validator = _ref.validator;

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

function editor() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var _ret = function () {

        switch (action.type) {

            case _ActionTypes.EDIT_ROW:
                var values = action.values;

                var isValid = isRowValid(action.columns, values);
                var iOverrides = state.getIn([stateKey, 'row', 'overrides']) ? state.getIn([stateKey, 'row', 'overrides']).toJS() : {};

                action.columns.forEach(function (col, i) {
                    var val = (0, _getData.getData)(values, action.columns, i);
                    var dataIndex = col.dataIndex;

                    // setting disabled
                    iOverrides[dataIndex] = iOverrides[dataIndex] || {};
                    iOverrides[dataIndex].disabled = setDisabled(col, val, values);
                });

                return {
                    v: state.setIn([action.stateKey], (0, _immutable.fromJS)({
                        row: {
                            key: action.rowId,
                            values: action.values,
                            rowIndex: action.rowIndex,
                            top: action.top,
                            valid: isValid,
                            isCreate: action.isCreate || false,
                            overrides: iOverrides
                        },
                        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
                    }))
                };

            case _ActionTypes.ROW_VALUE_CHANGE:
                var column = action.column;
                var columns = action.columns;
                var value = action.value;
                var stateKey = action.stateKey;

                var previousValues = state.getIn([stateKey, 'row', 'values']) ? state.getIn([stateKey, 'row', 'values']).toJS() : {};
                var overrides = state.getIn([stateKey, 'row', 'overrides']) ? state.getIn([stateKey, 'row', 'overrides']).toJS() : {};

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

                state = state.mergeIn([action.stateKey, 'row'], {
                    values: rowValues,
                    previousValues: state.getIn([stateKey, 'row', 'values']),
                    valid: valid,
                    overrides: overrides
                });

                return {
                    v: state.setIn([action.stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)())
                };

            case _ActionTypes.REPOSITION_EDITOR:

                var row = state.mergeIn([action.stateKey, 'row'], {
                    top: action.top
                }).getIn([action.stateKey, 'row']);

                return {
                    v: state.mergeIn([action.stateKey], (0, _immutable.fromJS)({
                        row: row,
                        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
                    }))
                };

            case _ActionTypes.REMOVE_ROW:
            case _ActionTypes.DISMISS_EDITOR:
            case _ActionTypes.CANCEL_ROW:
                return {
                    v: state.setIn([action.stateKey], (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() }))
                };

            default:
                return {
                    v: state
                };
        }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
}