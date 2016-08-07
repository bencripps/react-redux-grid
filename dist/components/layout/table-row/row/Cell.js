'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleDoubleClick = exports.handleClick = exports.getCellHTML = exports.Cell = undefined;
var _arguments = arguments;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor = require('./cell/Editor');

var _prefix = require('../../../../util/prefix');

var _handleEditClick = require('./../../../../util/handleEditClick');

var _elementContains = require('./../../../../util/elementContains');

var _GridConstants = require('./../../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = exports.Cell = function Cell(_ref) {
    var cellData = _ref.cellData;
    var columns = _ref.columns;
    var editor = _ref.editor;
    var editorState = _ref.editorState;
    var events = _ref.events;
    var index = _ref.index;
    var rowData = _ref.rowData;
    var rowIndex = _ref.rowIndex;
    var rowId = _ref.rowId;
    var stateKey = _ref.stateKey;
    var selectionModel = _ref.selectionModel;
    var store = _ref.store;


    var isEditable = editorState && editorState.row && editorState.row.key === rowId;

    var hidden = columns && columns[index] && columns[index].hidden !== undefined ? columns[index].hidden : null;

    var cellClickArguments = {
        events: events,
        columns: columns,
        cellData: cellData,
        editor: editor,
        editorState: editorState,
        rowIndex: rowIndex,
        rowData: rowData,
        rowId: rowId,
        selectionModel: selectionModel,
        stateKey: stateKey,
        store: store
    };

    var cellProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.CELL, isEditable ? 'edit' : ''),
        onClick: function onClick(e) {
            return handleClick(cellClickArguments, e);
        },
        onDoubleClick: function onDoubleClick(e) {
            return handleDoubleClick(cellClickArguments, e);
        },
        style: {}
    };

    if (hidden) {
        cellProps.style.display = 'none';
    }

    var cellHTML = getCellHTML(cellData, editorState, isEditable, columns, index, rowId, stateKey, store);

    return _react2.default.createElement(
        'td',
        cellProps,
        cellHTML
    );
};

var getCellHTML = exports.getCellHTML = function getCellHTML(cellData, editorState, isEditable, columns, index, rowId, stateKey, store) {

    var editorProps = {
        cellData: cellData,
        columns: columns,
        editorState: editorState,
        index: index,
        isEditable: isEditable,
        rowId: rowId,
        store: store,
        stateKey: stateKey
    };

    if (isEditable) {
        return _react2.default.createElement(_Editor.Editor, editorProps);
    }

    return _react2.default.createElement(
        'span',
        null,
        cellData
    );
};

var handleClick = exports.handleClick = function handleClick(_ref2, reactEvent) {
    var events = _ref2.events;
    var columns = _ref2.columns;
    var cellData = _ref2.cellData;
    var editor = _ref2.editor;
    var editorState = _ref2.editorState;
    var rowIndex = _ref2.rowIndex;
    var rowData = _ref2.rowData;
    var rowId = _ref2.rowId;
    var selectionModel = _ref2.selectionModel;
    var stateKey = _ref2.stateKey;
    var store = _ref2.store;


    if (reactEvent.target && (0, _elementContains.elementContains)(reactEvent.target, (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    if (selectionModel.defaults.editEvent === selectionModel.eventTypes.singleclick) {

        // if a row is clicked and the editorState is empty except
        // for last update integer, trigger edit event
        if (!editorState || Object.keys(editorState).length === 1) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, rowData, rowIndex, columns, stateKey, { reactEvent: reactEvent });
        } else if (editorState && editorState.row && editorState.row.rowIndex !== rowIndex) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, rowData, rowIndex, columns, stateKey, { reactEvent: reactEvent });
        }
    }

    if (events.HANDLE_CELL_CLICK) {
        return events.HANDLE_CELL_CLICK.apply(undefined, _arguments);
    }
};

var handleDoubleClick = exports.handleDoubleClick = function handleDoubleClick(_ref3, reactEvent) {
    var events = _ref3.events;
    var columns = _ref3.columns;
    var cellData = _ref3.cellData;
    var editor = _ref3.editor;
    var editorState = _ref3.editorState;
    var rowIndex = _ref3.rowIndex;
    var rowData = _ref3.rowData;
    var rowId = _ref3.rowId;
    var selectionModel = _ref3.selectionModel;
    var stateKey = _ref3.stateKey;
    var store = _ref3.store;


    if (reactEvent.target && (0, _elementContains.elementContains)(reactEvent.target, (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    // if a row is clicked and the editorState is empty except
    // for last update integer, trigger edit event
    if (!editorState || Object.keys(editorState).length === 1) {
        (0, _handleEditClick.handleEditClick)(editor, store, rowId, rowData, rowIndex, columns, stateKey, { reactEvent: reactEvent });
    } else if (selectionModel.defaults.editEvent === selectionModel.eventTypes.doubleclick) {
        (0, _handleEditClick.handleEditClick)(editor, store, rowId, rowData, rowIndex, columns, stateKey, { reactEvent: reactEvent });
    }

    if (events.HANDLE_CELL_DOUBLE_CLICK) {
        return events.HANDLE_CELL_DOUBLE_CLICK.apply(undefined, _arguments);
    }
};

Cell.propTypes = {
    cellData: _react.PropTypes.any,
    columns: _react.PropTypes.array,
    data: _react.PropTypes.func,
    editor: _react.PropTypes.object,
    editorState: _react.PropTypes.object,
    events: _react.PropTypes.object,
    index: _react.PropTypes.number,
    rowData: _react.PropTypes.object,
    rowId: _react.PropTypes.string,
    rowIndex: _react.PropTypes.number,
    selectionModel: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};