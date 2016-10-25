'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.cleanProps = exports.Editor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('./Input');

var _GridConstants = require('./../../../../../constants/GridConstants');

var _prefix = require('./../../../../../util/prefix');

var _getData = require('./../../../../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrapperCls = (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.EDITOR.INLINE.INPUT_WRAPPER);

var Editor = exports.Editor = function Editor(_ref) {
    var cellData = _ref.cellData;
    var columns = _ref.columns;
    var editorState = _ref.editorState;
    var rawValue = _ref.rawValue;
    var index = _ref.index;
    var isEditable = _ref.isEditable;
    var rowData = _ref.rowData;
    var isRowSelected = _ref.isRowSelected;
    var rowId = _ref.rowId;
    var stateKey = _ref.stateKey;
    var store = _ref.store;


    if (!editorState) {
        editorState = {};
    }

    if (!editorState[rowId]) {
        editorState[rowId] = {};
    }

    editorState[rowId].key = rowId;

    var colName = columns && columns[index] ? (0, _getData.nameFromDataIndex)(columns[index]) : '';

    if (!colName) {
        colName = columns && columns[index] && columns[index].name ? columns[index].name : '';
    }

    var value = editorState[rowId].values ? editorState[rowId].values[colName] : rawValue;

    var editableFuncArgs = {
        row: editorState[rowId],
        isRowSelected: isRowSelected,
        store: store
    };

    if (isEditable && columns[index] && columns[index].editor && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true) && typeof columns[index].editor === 'function') {

        var input = columns[index].editor({
            column: columns[index],
            columns: columns,
            store: store,
            rowId: rowId,
            row: editorState[rowId] && editorState[rowId].values ? _extends({}, rowData, cleanProps(editorState[rowId].values)) : _extends({ key: rowId }, rowData),
            columnIndex: index,
            value: value,
            isRowSelected: isRowSelected,
            stateKey: stateKey
        });

        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
            input
        );
    } else if (isEditable && columns[index] && (columns[index].editable === undefined || columns[index].editable) && (typeof columns[index].editable === 'function' ? columns[index].editable(editableFuncArgs) : true)) {
        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
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
        { className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.INACTIVE_CLASS) },
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

var any = _react.PropTypes.any;
var array = _react.PropTypes.array;
var bool = _react.PropTypes.bool;
var number = _react.PropTypes.number;
var object = _react.PropTypes.object;
var string = _react.PropTypes.string;


Editor.propTypes = {
    cellData: any,
    columns: array,
    editorState: object,
    index: number,
    isEditable: bool,
    isRowSelected: bool,
    rawValue: any,
    rowData: object,
    rowId: string,
    stateKey: string,
    store: object
};

Editor.defaultProps = {
    isRowSelected: false
};