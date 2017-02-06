'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanProps = exports.Editor = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input');

var _GridConstants = require('./../../../../../constants/GridConstants');

var _prefix = require('./../../../../../util/prefix');

var _getData = require('./../../../../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = exports.Editor = function Editor(_ref) {
    var cellData = _ref.cellData,
        columns = _ref.columns,
        editorState = _ref.editorState,
        rawValue = _ref.rawValue,
        index = _ref.index,
        isEditable = _ref.isEditable,
        row = _ref.row,
        isRowSelected = _ref.isRowSelected,
        rowId = _ref.rowId,
        stateKey = _ref.stateKey,
        store = _ref.store;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var colName = columns && columns[index] ? (0, _getData.nameFromDataIndex)(columns[index]) : '';

    if (!colName) {
        colName = columns && columns[index] && columns[index].name ? columns[index].name : '';
    }

    var editorData = editorState.get(rowId) || new Map();

    var value = editorData.values && editorData.values.get ? editorData.values.get(colName) : rawValue;

    var editableFuncArgs = {
        row: editorState.get(rowId) ? editorState.get(rowId).toJS() : {},
        isRowSelected: isRowSelected,
        store: store
    };

    if (isEditable && columns[index] && columns[index].editor && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true) && typeof columns[index].editor === 'function') {

        var input = columns[index].editor({
            column: columns[index],
            columns: columns,
            store: store,
            rowId: rowId,
            row: editorData && editorData.values && editorData.toJS ? Object.assign({}, row, cleanProps(editorData.values.toJS())) : Object.assign({ key: rowId }, row),
            columnIndex: index,
            value: value && value.toJS ? value.toJS() : value,
            isRowSelected: isRowSelected,
            stateKey: stateKey
        });

        return _react2.default.createElement(
            'span',
            { className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) },
            input
        );
    } else if (isEditable && columns[index] && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true)) {

        return _react2.default.createElement(
            'span',
            { className: (0, _prefix.prefix)(CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER) },
            _react2.default.createElement(_Input.Input, {
                cellData: value,
                column: columns[index],
                columns: columns,
                editorState: editorState,
                rowId: rowId,
                stateKey: stateKey,
                store: store
            })
        );
    }

    return _react2.default.createElement(
        'span',
        { className: (0, _prefix.prefix)(CLASS_NAMES.INACTIVE_CLASS) },
        cellData
    );
};

var cleanProps = exports.cleanProps = function cleanProps() {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Object.keys(obj).forEach(function (k) {
        return obj[k] === undefined && delete obj[k];
    });
    return obj;
};

var any = _react.PropTypes.any,
    array = _react.PropTypes.array,
    bool = _react.PropTypes.bool,
    number = _react.PropTypes.number,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;


Editor.propTypes = {
    cellData: any,
    columns: array,
    editorState: object,
    index: number,
    isEditable: bool,
    isRowSelected: bool,
    rawValue: any,
    row: object,
    rowId: string,
    stateKey: string,
    store: object
};

Editor.defaultProps = {
    isRowSelected: false
};