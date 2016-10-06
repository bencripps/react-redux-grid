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

var _TreeArrow = require('./cell/TreeArrow');

var _TreeArrow2 = _interopRequireDefault(_TreeArrow);

var _DragHandle = require('./cell/DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = exports.Cell = function Cell(_ref) {
    var cellData = _ref.cellData;
    var columns = _ref.columns;
    var dragAndDrop = _ref.dragAndDrop;
    var editor = _ref.editor;
    var editorState = _ref.editorState;
    var events = _ref.events;
    var gridType = _ref.gridType;
    var index = _ref.index;
    var readFunc = _ref.readFunc;
    var rowData = _ref.rowData;
    var rowIndex = _ref.rowIndex;
    var rowId = _ref.rowId;
    var stateKey = _ref.stateKey;
    var selectionModel = _ref.selectionModel;
    var stateful = _ref.stateful;
    var store = _ref.store;
    var showTreeRootNode = _ref.showTreeRootNode;
    var treeData = _ref.treeData;


    var isEditable = editorState && editorState.row && editorState.row.key === rowId;

    var isExpandable = treeData.expandable && !treeData.leaf;

    var shouldNest = treeData.expandable;

    var depth = treeData.depth !== undefined && gridType === 'tree' ? treeData.depth : null;

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
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.CELL, isEditable ? 'edit' : '', isExpandable ? 'expand' : '', shouldNest ? 'tree-nested' : '', depth !== null ? 'tree-node-depth-' + depth : ''),
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

    var arrowProps = {
        isEditable: isEditable,
        isExpandable: isExpandable,
        isExpanded: treeData.isExpanded,
        hasChildren: treeData.hasChildren,
        shouldNest: shouldNest,
        depth: depth,
        id: treeData.id,
        readFunc: readFunc,
        showTreeRootNode: showTreeRootNode,
        stateful: stateful,
        stateKey: stateKey,
        store: store
    };

    var dragHandleProps = {
        store: store
    };

    // only have drag handle in first cell
    var dragHandle = dragAndDrop && index === 0 ? _react2.default.createElement(_DragHandle2.default, dragHandleProps) : null;

    var arrow = gridType === 'tree' && shouldNest ? _react2.default.createElement(_TreeArrow2.default, arrowProps) : null;

    var cellHTML = getCellHTML(cellData, editorState, isEditable, columns, index, rowId, stateKey, store);

    var handleContainer = dragHandle || arrow ? _react2.default.createElement(
        'div',
        { className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.CELL_HANDNLE_CONTAINER) },
        dragHandle,
        arrow
    ) : null;

    return _react2.default.createElement(
        'td',
        cellProps,
        handleContainer,
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

var any = _react.PropTypes.any;
var array = _react.PropTypes.array;
var bool = _react.PropTypes.bool;
var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var oneOf = _react.PropTypes.oneOf;
var number = _react.PropTypes.number;
var string = _react.PropTypes.string;


Cell.propTypes = {
    cellData: any,
    columns: array,
    data: func,
    dragAndDrop: bool,
    editor: object,
    editorState: object,
    events: object,
    gridType: oneOf(['tree', 'grid']),
    index: number,
    readFunc: func,
    rowData: object,
    rowId: string,
    rowIndex: number,
    selectionModel: object,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object,
    treeData: object
};

Cell.defaultProps = {
    treeData: {}
};