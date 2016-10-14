'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addNewRow = exports.updateRow = exports.setEditorValidation = exports.removeRow = exports.cancelRow = exports.saveRow = exports.updateCellValue = exports.dismissEditor = exports.repositionEditor = exports.editRow = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var _keyGenerator = require('../../../util/keyGenerator');

var editRow = exports.editRow = function editRow(_ref) {
    var rowId = _ref.rowId;
    var top = _ref.top;
    var _ref$rowData = _ref.rowData;
    var rowData = _ref$rowData === undefined ? {} : _ref$rowData;
    var rowIndex = _ref.rowIndex;
    var columns = _ref.columns;
    var isCreate = _ref.isCreate;
    var stateKey = _ref.stateKey;
    var _ref$editMode = _ref.editMode;
    var editMode = _ref$editMode === undefined ? 'inline' : _ref$editMode;


    if (!rowId) {
        throw new Error('rowId is a required parameter for editRow Action');
    }

    return {
        type: _ActionTypes.EDIT_ROW,
        rowId: rowId,
        top: top,
        values: rowData,
        rowIndex: rowIndex,
        columns: columns,
        isCreate: isCreate,
        stateKey: stateKey,
        editMode: editMode
    };
};

var repositionEditor = exports.repositionEditor = function repositionEditor(_ref2) {
    var top = _ref2.top;
    var stateKey = _ref2.stateKey;
    var rowId = _ref2.rowId;
    return {
        type: _ActionTypes.REPOSITION_EDITOR,
        rowId: rowId,
        stateKey: stateKey,
        top: top
    };
};

var dismissEditor = exports.dismissEditor = function dismissEditor(_ref3) {
    var stateKey = _ref3.stateKey;
    return {
        type: _ActionTypes.DISMISS_EDITOR, stateKey: stateKey
    };
};

var updateCellValue = exports.updateCellValue = function updateCellValue(_ref4) {
    var value = _ref4.value;
    var name = _ref4.name;
    var column = _ref4.column;
    var columns = _ref4.columns;
    var stateKey = _ref4.stateKey;
    var rowId = _ref4.rowId;
    return {
        type: _ActionTypes.ROW_VALUE_CHANGE,
        value: value,
        columnName: name,
        column: column,
        columns: columns,
        stateKey: stateKey,
        rowId: rowId
    };
};

var saveRow = exports.saveRow = function saveRow(_ref5) {
    var values = _ref5.values;
    var rowIndex = _ref5.rowIndex;
    var stateKey = _ref5.stateKey;
    return {
        type: _ActionTypes.SAVE_ROW, values: values, rowIndex: rowIndex, stateKey: stateKey
    };
};

var cancelRow = exports.cancelRow = function cancelRow(_ref6) {
    var stateKey = _ref6.stateKey;
    return {
        type: _ActionTypes.CANCEL_ROW, stateKey: stateKey
    };
};

var removeRow = exports.removeRow = function removeRow(_ref7) {
    var rowIndex = _ref7.rowIndex;
    var stateKey = _ref7.stateKey;
    return {
        type: _ActionTypes.REMOVE_ROW, rowIndex: rowIndex, stateKey: stateKey
    };
};

var setEditorValidation = exports.setEditorValidation = function setEditorValidation(_ref8) {
    var validationState = _ref8.validationState;
    var stateKey = _ref8.stateKey;
    return {
        type: _ActionTypes.EDITOR_VALIDATION, validationState: validationState, stateKey: stateKey
    };
};

var updateRow = exports.updateRow = function updateRow(_ref9) {
    var stateKey = _ref9.stateKey;
    var rowIndex = _ref9.rowIndex;
    var values = _ref9.values;
    return {
        type: _ActionTypes.UPDATE_ROW,
        stateKey: stateKey,
        rowIndex: rowIndex,
        values: values
    };
};

var addNewRow = exports.addNewRow = function addNewRow(_ref10) {
    var columns = _ref10.columns;
    var data = _ref10.data;
    var stateKey = _ref10.stateKey;
    var _ref10$editMode = _ref10.editMode;
    var editMode = _ref10$editMode === undefined ? 'inline' : _ref10$editMode;
    return function (dispatch) {
        var rowId = (0, _keyGenerator.keyGenerator)('row', 0);
        var top = 43;
        var rowData = data || {};
        var rowIndex = 0;
        var isCreate = true;

        dispatch({ type: _ActionTypes.ADD_NEW_ROW, stateKey: stateKey, rowId: rowId });

        dispatch(editRow({
            rowId: rowId,
            top: top,
            rowData: rowData,
            rowIndex: rowIndex,
            columns: columns,
            isCreate: isCreate,
            stateKey: stateKey,
            editMode: editMode
        }));
    };
};