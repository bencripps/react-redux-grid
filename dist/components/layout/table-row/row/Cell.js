'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleDoubleClick = exports.handleClick = exports.getCellHTML = exports.Cell = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Editor = require('./cell/Editor');

var _prefix = require('../../../../util/prefix');

var _getData = require('./../../../../util/getData');

var _handleEditClick = require('./../../../../util/handleEditClick');

var _elementContains = require('./../../../../util/elementContains');

var _fire = require('./../../../../util/fire');

var _GridConstants = require('./../../../../constants/GridConstants');

var _TreeArrow = require('./cell/TreeArrow');

var _TreeArrow2 = _interopRequireDefault(_TreeArrow);

var _DragHandle = require('./cell/DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = exports.Cell = function Cell(_ref) {
    var cellData = _ref.cellData,
        columns = _ref.columns,
        dragAndDrop = _ref.dragAndDrop,
        editor = _ref.editor,
        editorState = _ref.editorState,
        events = _ref.events,
        gridType = _ref.gridType,
        index = _ref.index,
        isRowSelected = _ref.isRowSelected,
        readFunc = _ref.readFunc,
        row = _ref.row,
        rowId = _ref.rowId,
        rowIndex = _ref.rowIndex,
        selectionModel = _ref.selectionModel,
        showTreeRootNode = _ref.showTreeRootNode,
        stateful = _ref.stateful,
        stateKey = _ref.stateKey,
        store = _ref.store,
        treeData = _ref.treeData;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var isEditable = editorState && editorState.get && editorState.get(rowId) && editorState.get(rowId).key === rowId || editor.config.type === editor.editModes.grid;

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
        row: row,
        rowId: rowId,
        selectionModel: selectionModel,
        stateKey: stateKey,
        store: store
    };

    var cellProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.CELL, isEditable ? 'edit' : '', isExpandable ? 'expand' : '', shouldNest ? 'tree-nested' : '', depth !== null ? 'tree-node-depth-' + depth : ''),
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

    // only have drag handle in first cell
    var dragHandle = dragAndDrop && index === 0 ? _react2.default.createElement(_DragHandle2.default, { store: store }) : null;

    var arrow = gridType === 'tree' && shouldNest ? _react2.default.createElement(_TreeArrow2.default, arrowProps) : null;

    var cellHTML = getCellHTML(cellData, editorState, isEditable, isRowSelected, columns, index, rowId, row, stateKey, store);

    var className = (0, _prefix.prefix)(CLASS_NAMES.CELL_HANDNLE_CONTAINER);

    var handleContainer = dragHandle || arrow ? _react2.default.createElement(
        'div',
        { className: className },
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

var getCellHTML = exports.getCellHTML = function getCellHTML(cellData, editorState, isEditable, isRowSelected, columns, index, rowId, row, stateKey, store) {

    if (isEditable) {
        return _react2.default.createElement(_Editor.Editor, {
            cellData: cellData,
            columns: columns,
            editorState: editorState,
            index: index,
            isEditable: isEditable,
            isRowSelected: isRowSelected,
            rawValue: (0, _getData.getData)(row, columns, index),
            row: row,
            rowId: rowId,
            stateKey: stateKey,
            store: store
        });
    }

    return _react2.default.createElement('span', { children: cellData });
};

var handleClick = exports.handleClick = function handleClick(_ref2, reactEvent) {
    var events = _ref2.events,
        columns = _ref2.columns,
        cellData = _ref2.cellData,
        editor = _ref2.editor,
        editorState = _ref2.editorState,
        rowIndex = _ref2.rowIndex,
        row = _ref2.row,
        rowId = _ref2.rowId,
        selectionModel = _ref2.selectionModel,
        stateKey = _ref2.stateKey,
        store = _ref2.store;

    var _gridConfig2 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig2.CLASS_NAMES;

    if (reactEvent.target && (0, _elementContains.elementContains)(reactEvent.target, (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    if (selectionModel.defaults.editEvent === selectionModel.eventTypes.singleclick) {

        // if a row is clicked and the editorState is empty except
        // for last update integer, trigger edit event
        if (!editorState || editorState.count() === 1) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, row, rowIndex, columns, stateKey, events, { reactEvent: reactEvent });
        } else if (editorState && !editorState.get(rowId)) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, row, rowIndex, columns, stateKey, events, { reactEvent: reactEvent });
        }
    }

    return (0, _fire.fireEvent)('HANDLE_CELL_CLICK', events, {
        editor: editor,
        row: row,
        rowId: rowId,
        rowIndex: rowIndex
    }, reactEvent);
};

var handleDoubleClick = exports.handleDoubleClick = function handleDoubleClick(_ref3, reactEvent) {
    var events = _ref3.events,
        columns = _ref3.columns,
        cellData = _ref3.cellData,
        editor = _ref3.editor,
        editorState = _ref3.editorState,
        rowIndex = _ref3.rowIndex,
        row = _ref3.row,
        rowId = _ref3.rowId,
        selectionModel = _ref3.selectionModel,
        stateKey = _ref3.stateKey,
        store = _ref3.store;

    var _gridConfig3 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig3.CLASS_NAMES;

    if (reactEvent.target && (0, _elementContains.elementContains)(reactEvent.target, (0, _prefix.prefix)(CLASS_NAMES.EDITED_CELL))) {
        reactEvent.stopPropagation();
    }

    if (selectionModel.defaults.editEvent === selectionModel.eventTypes.doubleclick) {

        // if a row is clicked and the editorState is empty except
        // for last update integer, trigger edit event
        if (!editorState || Object.keys(editorState).length === 1) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, row, rowIndex, columns, stateKey, events, { reactEvent: reactEvent });
        } else if (editorState && !editorState[rowId]) {
            (0, _handleEditClick.handleEditClick)(editor, store, rowId, row, rowIndex, columns, stateKey, events, { reactEvent: reactEvent });
        }
    }

    return (0, _fire.fireEvent)('HANDLE_CELL_DOUBLE_CLICK', events, {
        editor: editor,
        row: row,
        rowId: rowId,
        rowIndex: rowIndex
    }, reactEvent);
};

var any = _react.PropTypes.any,
    array = _react.PropTypes.array,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    object = _react.PropTypes.object,
    oneOf = _react.PropTypes.oneOf,
    number = _react.PropTypes.number,
    string = _react.PropTypes.string;


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
    isRowSelected: bool,
    readFunc: func,
    row: object,
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