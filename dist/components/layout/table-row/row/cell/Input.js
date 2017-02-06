'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleChange = exports.Input = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditorActions = require('./../../../../../actions/plugins/editor/EditorActions');

var _getData = require('./../../../../../util/getData');

var _records = require('./../../../../../records');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = exports.Input = function Input(_ref) {
    var cellData = _ref.cellData,
        column = _ref.column,
        columns = _ref.columns,
        editorState = _ref.editorState,
        rowId = _ref.rowId,
        stateKey = _ref.stateKey,
        store = _ref.store;


    var colName = (0, _getData.nameFromDataIndex)(column);
    var editorData = editorState && editorState.get ? editorState.get(rowId) : new _records.Editor();

    var overrides = editorData && editorData.values && editorData.overrides[colName] !== undefined ? editorData.overrides[colName] : {};

    var placeholder = column && column.placeholder ? column.placeholder : false;

    var value = editorData && editorData.values && editorData.values[colName] !== undefined ? editorData.values[colName] : cellData;

    var disabled = overrides.disabled || editorState && editorData && !editorData.isCreate && column.editable === 'create';

    var onChange = function onChange(e) {
        return handleChange(column, columns, rowId, stateKey, store, e);
    };

    return _react2.default.createElement('input', {
        disabled: disabled,
        onChange: onChange,
        placeholder: placeholder,
        type: 'text',
        value: value
    });
};

var handleChange = exports.handleChange = function handleChange(columnDefinition, columns, rowId, stateKey, store, reactEvent) {

    store.dispatch((0, _EditorActions.updateCellValue)({
        value: reactEvent.target.value,
        name: (0, _getData.nameFromDataIndex)(columnDefinition),
        column: columnDefinition,
        rowId: rowId,
        columns: columns,
        stateKey: stateKey
    }));
};

Input.propTypes = {
    cellData: _react.PropTypes.any,
    column: _react.PropTypes.object,
    columns: _react.PropTypes.array,
    editorState: _react.PropTypes.object,
    rowId: _react.PropTypes.string,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};