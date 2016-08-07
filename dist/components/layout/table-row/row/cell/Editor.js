'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Editor = undefined;

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
    var index = _ref.index;
    var isEditable = _ref.isEditable;
    var rowId = _ref.rowId;
    var stateKey = _ref.stateKey;
    var store = _ref.store;


    var colName = columns && columns[index] ? (0, _getData.nameFromDataIndex)(columns[index]) : '';

    if (!colName) {
        colName = columns && columns[index] && columns[index].name ? columns[index].name : '';
    }

    var value = editorState && editorState.row && editorState.row.values ? editorState.row.values[colName] : null;

    if (isEditable && columns[index] && columns[index].editor && (columns[index].editable === undefined || columns[index].editable) && typeof columns[index].editor === 'function') {

        var input = columns[index].editor({
            column: columns[index],
            columns: columns,
            store: store,
            rowId: rowId,
            row: editorState.row,
            columnIndex: index,
            value: value,
            stateKey: stateKey
        });

        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
            ' ',
            input,
            ' '
        );
    } else if (isEditable && columns[index] && (columns[index].editable === undefined || columns[index].editable)) {
        return _react2.default.createElement(
            'span',
            { className: wrapperCls },
            _react2.default.createElement(_Input.Input, {
                column: columns[index],
                columns: columns,
                editorState: editorState,
                cellData: cellData,
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

Editor.propTypes = {
    cellData: _react.PropTypes.any,
    columns: _react.PropTypes.array,
    editorState: _react.PropTypes.object,
    index: _react.PropTypes.number,
    isEditable: _react.PropTypes.bool,
    rowId: _react.PropTypes.string,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};

Editor.defaultProps = {};