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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        var _fromJS;

        switch (action.type) {

            case _ActionTypes.EDIT_ROW:
                var values = action.values;

                var isValid = isRowValid(action.columns, values);
                var iOverrides = state.getIn([stateKey, action.rowId, 'overrides']) ? state.getIn([stateKey, action.rowId, 'overrides']).toJS() : {};

                action.columns.forEach(function (col, i) {
                    var val = (0, _getData.getData)(values, action.columns, i);
                    var dataIndex = col.dataIndex;

                    // setting disabled
                    iOverrides[dataIndex] = iOverrides[dataIndex] || {};
                    iOverrides[dataIndex].disabled = setDisabled(col, val, values);
                });

                var operation = action.editMode === 'inline' ? 'setIn' : 'mergeIn';

                return {
                    v: state[operation]([action.stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, action.rowId, {
                        key: action.rowId,
                        values: action.values,
                        rowIndex: action.rowIndex,
                        top: action.top,
                        valid: isValid,
                        isCreate: action.isCreate || false,
                        overrides: iOverrides
                    }), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)))
                };

            case _ActionTypes.SET_DATA:

                // if grid editor is type 'grid', we need to map the datasource
                // to editor state
                if (action.editMode === 'grid') {

                    var dataWithKeys = (0, _getData.setKeysInData)(action.data);
                    var editorData = dataWithKeys.reduce(function (prev, curr, i) {
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

                    return {
                        v: state.mergeIn([action.stateKey], editorData)
                    };
                }

                return {
                    v: state
                };

            case _ActionTypes.ROW_VALUE_CHANGE:
                var column = action.column;
                var columns = action.columns;
                var value = action.value;
                var stateKey = action.stateKey;

                var previousValues = state.getIn([stateKey, action.rowId, 'values']) ? state.getIn([stateKey, action.rowId, 'values']).toJS() : {};
                var overrides = state.getIn([stateKey, action.rowId, 'overrides']) ? state.getIn([stateKey, action.rowId, 'overrides']).toJS() : {};

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

                state = state.mergeIn([action.stateKey, action.rowId], {
                    values: rowValues,
                    previousValues: state.getIn([stateKey, action.rowId, 'values']),
                    valid: valid,
                    overrides: overrides
                });

                return {
                    v: state.setIn([action.stateKey, 'lastUpdate'], (0, _lastUpdate.generateLastUpdate)())
                };

            case _ActionTypes.REPOSITION_EDITOR:
                var newState = state.mergeIn([action.stateKey, action.rowId], {
                    top: action.top
                });

                return {
                    v: newState.mergeIn([action.stateKey], { lastUpdate: (0, _lastUpdate.generateLastUpdate)() })
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