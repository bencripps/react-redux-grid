'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleRowSingleClickEvent = exports.getSelectedText = exports.handleRowDoubleClickEvent = exports.addEmptyCells = exports.getCellData = exports.addEmptyInsert = exports.getCellValues = exports.Row = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _Cell = require('./row/Cell');

var _EmptyCell = require('./row/EmptyCell');

var _RowContainer = require('./row/RowContainer');

var _RowContainer2 = _interopRequireDefault(_RowContainer);

var _prefix = require('../../../util/prefix');

var _getData = require('../../../util/getData');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf;
var bool = _react.PropTypes.bool;
var func = _react.PropTypes.func;
var object = _react.PropTypes.object;
var string = _react.PropTypes.string;
var oneOf = _react.PropTypes.oneOf;
var number = _react.PropTypes.number;


var DRAG_INCREMENT = 15;

var Row = exports.Row = function (_Component) {
    _inherits(Row, _Component);

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var columnManager = _props.columnManager;
            var columns = _props.columns;
            var connectDragSource = _props.connectDragSource;
            var connectDropTarget = _props.connectDropTarget;
            var dragAndDrop = _props.dragAndDrop;
            var editor = _props.editor;
            var editorState = _props.editorState;
            var events = _props.events;
            var gridType = _props.gridType;
            var index = _props.index;
            var isDragging = _props.isDragging;
            var menuState = _props.menuState;
            var plugins = _props.plugins;
            var readFunc = _props.readFunc;
            var reducerKeys = _props.reducerKeys;
            var row = _props.row;
            var selectedRows = _props.selectedRows;
            var selectionModel = _props.selectionModel;
            var showTreeRootNode = _props.showTreeRootNode;
            var stateful = _props.stateful;
            var stateKey = _props.stateKey;
            var store = _props.store;
            var treeData = _props.treeData;


            var id = row._key;

            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });
            var cellValues = getCellValues(columns, row);

            if (Object.keys(row).length !== columns.length) {
                addEmptyCells(row, columns);
            }

            var isSelected = selectedRows ? selectedRows[id] : false;

            var cells = Object.keys(cellValues).map(function (k, i) {

                var cellProps = {
                    cellData: getCellData(columns, editor, editorState, row, k, i, store),
                    columns: columns,
                    dragAndDrop: dragAndDrop,
                    editor: editor,
                    editorState: editorState,
                    events: events,
                    gridType: gridType,
                    index: i,
                    readFunc: readFunc,
                    reducerKeys: reducerKeys,
                    rowData: cellValues,
                    rowId: id,
                    rowIndex: index,
                    selectionModel: selectionModel,
                    showTreeRootNode: showTreeRootNode,
                    stateful: stateful,
                    stateKey: stateKey,
                    isRowSelected: isSelected,
                    store: store,
                    treeData: _extends({}, treeData, {
                        expandable: columns[i].expandable
                    })
                };

                var key = (0, _getData.getRowKey)(columns, row, columns[i].dataIndex);

                return _react2.default.createElement(_Cell.Cell, _extends({
                    key: key
                }, cellProps));
            });

            var editClass = editorState && editorState[id] && editor.config.type !== 'grid' ? selectionModel.defaults.editCls : '';

            var selectedClass = isSelected ? selectionModel.defaults.activeCls : '';

            var dragClass = isDragging ? _GridConstants.CLASS_NAMES.ROW_IS_DRAGGING : '';

            var rowProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW, selectedClass, editClass, dragClass),
                onClick: function onClick(e) {
                    handleRowSingleClickEvent(events, row, id, selectionModel, index, isSelected, e);
                },
                onDoubleClick: function onDoubleClick(e) {
                    handleRowDoubleClickEvent(events, row, id, selectionModel, index, isSelected, e);
                },
                onDragStart: this.handleDragStart.bind(this)
            };

            columnManager.addActionColumn({
                cells: cells,
                columns: columns,
                type: 'row',
                id: id,
                reducerKeys: reducerKeys,
                rowData: row,
                rowIndex: index,
                stateKey: stateKey,
                menuState: menuState
            });

            selectionModel.updateCells({
                cells: cells,
                rowId: id,
                index: index,
                type: 'row',
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                rowData: cellValues,
                isSelected: !isSelected
            });

            addEmptyInsert(cells, visibleColumns, plugins);

            var rowEl = _react2.default.createElement(
                'tr',
                rowProps,
                cells
            );

            if (dragAndDrop) {
                return connectDragSource(connectDropTarget(rowEl));
            }

            return rowEl;
        }
    }]);

    function Row(props) {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).call(this, props));
    }

    _createClass(Row, [{
        key: 'handleDragStart',
        value: function handleDragStart(e) {
            var row = this.props.row;

            // this has nothing to do with grid drag and drop
            // only use is setting meta data for custom drop events
            // per issue #59

            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: row._key,
                data: row
            }));

            return e;
        }
    }]);

    return Row;
}(_react.Component);

Row.propTypes = {
    columnManager: object.isRequired,
    columns: arrayOf(object).isRequired,
    connectDragSource: func,
    connectDropTarget: func,
    data: arrayOf(object),
    dataSource: object,
    dragAndDrop: bool,
    editor: object,
    editorState: object,
    emptyDataMessage: string,
    events: object,
    gridType: oneOf(['tree', 'grid']),
    index: number,
    isDragging: bool,
    menuState: object,
    pageSize: number,
    pager: object,
    plugins: object,
    readFunc: func,
    reducerKeys: object,
    row: object,
    selectedRows: object,
    selectionModel: object,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object.isRequired,
    treeData: object
};
Row.defaultProps = {
    connectDragSource: function connectDragSource(i) {
        return i;
    },
    connectDropTarget: function connectDropTarget(i) {
        return i;
    },
    emptyDataMessage: 'No Data Available',
    treeData: {}
};
var getCellValues = exports.getCellValues = function getCellValues(columns, row) {

    var result = {};
    var dataIndexes = columns.map(function (col) {
        return col.dataIndex;
    });

    dataIndexes.forEach(function (idx) {
        result[idx] = row[idx];
    });

    return result;
};

var addEmptyInsert = exports.addEmptyInsert = function addEmptyInsert(cells, visibleColumns, plugins) {

    if (visibleColumns.length === 0) {

        if (plugins && plugins.GRID_ACTIONS && plugins.GRID_ACTIONS.menu && plugins.GRID_ACTIONS.menu.length > 0) {
            cells.splice(1, 0, _react2.default.createElement(_EmptyCell.EmptyCell, null));
        } else {
            cells.push(_react2.default.createElement(_EmptyCell.EmptyCell, null));
        }
    }

    return cells;
};

var getCellData = exports.getCellData = function getCellData(columns, editor, editorState, row, key, index, store) {

    var rowId = row._key;

    // if a renderer is present, but
    // were in edited mode, we should use the edited values
    // since those could be modified using a 'change' function
    var editedValues = editorState && editorState[rowId] && editorState[rowId].values ? editorState[rowId].values : {};

    var valueAtDataIndex = (0, _getData.getData)(row, columns, index, editedValues);

    // if a render has been provided, default to this
    // as long as editor type isnt 'grid'
    if (row && columns[index] && columns[index].renderer && typeof columns[index].renderer === 'function') {
        return columns[index].renderer({
            column: columns[index],
            value: valueAtDataIndex,
            row: row,
            key: key,
            index: index,
            store: store
        });
    }

    // if dataIndex has been provided
    // return the obj[dataIndex]
    else if (valueAtDataIndex !== undefined) {
            return valueAtDataIndex;
        }

    // else no data index found
};

var addEmptyCells = exports.addEmptyCells = function addEmptyCells(rowData, columns) {

    columns.forEach(function (col) {

        // const data = nameFromDataIndex(col);
        // come back to this
        // how we retrieve and store data, especially editable
        // may need to be updated based on array dataIndex

        if (rowData && !rowData.hasOwnProperty(col.dataIndex)) {
            rowData[col.dataIndex] = '';
        }
    });

    return rowData;
};

var handleRowDoubleClickEvent = exports.handleRowDoubleClickEvent = function handleRowDoubleClickEvent(events, rowData, rowId, selectionModel, index, isSelected, reactEvent, id, browserEvent) {
    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index,
            data: rowData,
            selected: !isSelected
        });
    }

    if (events.HANDLE_ROW_DOUBLE_CLICK) {
        events.HANDLE_ROW_DOUBLE_CLICK.call(undefined, rowData, rowId, reactEvent, id, browserEvent);
    }
};

var getSelectedText = exports.getSelectedText = function getSelectedText() {
    var text = '';
    if (typeof window.getSelection !== 'undefined') {
        text = window.getSelection().toString();
    } else if (typeof document.selection !== 'undefined' && document.selection.type === 'Text') {
        text = document.selection.createRange().text;
    }
    return text;
};

var handleRowSingleClickEvent = exports.handleRowSingleClickEvent = function handleRowSingleClickEvent(events, rowData, rowId, selectionModel, index, isSelected, reactEvent, id, browserEvent) {

    if (getSelectedText()) {
        return false;
    }

    if (events.HANDLE_BEFORE_ROW_CLICK) {
        events.HANDLE_BEFORE_ROW_CLICK.call(undefined, rowData, rowId, reactEvent, id, browserEvent);
    }

    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index,
            data: rowData,
            selected: !isSelected
        });
    }

    if (events.HANDLE_ROW_CLICK) {
        events.HANDLE_ROW_CLICK.call(undefined, rowData, rowId, reactEvent, id, browserEvent);
    }
};

var rowSource = {
    beginDrag: function beginDrag(_ref) {
        var getTreeData = _ref.getTreeData;

        return { getTreeData: getTreeData };
    }
};

var rowTarget = {
    hover: function hover(props, monitor, component) {
        var _props$treeData = props.treeData;
        var hoverIndex = _props$treeData.index;
        var hoverId = _props$treeData.id;
        var hoverIsExpanded = _props$treeData.isExpanded;
        var hoverParentId = _props$treeData.parentId;
        var hoverPath = _props$treeData.path;
        var hoverFlatIndex = _props$treeData.flatIndex;

        var _monitor$getItem = monitor.getItem();

        var lastX = _monitor$getItem.lastX;
        var getTreeData = _monitor$getItem.getTreeData;

        var _getTreeData = getTreeData();

        var id = _getTreeData.id;
        var index = _getTreeData.index;
        var parentId = _getTreeData.parentId;
        var isLastChild = _getTreeData.isLastChild;
        var isFirstChild = _getTreeData.isFirstChild;
        var flatIndex = _getTreeData.flatIndex;
        var parentIndex = _getTreeData.parentIndex;
        var previousSiblingTotalChildren = _getTreeData.previousSiblingTotalChildren;
        var previousSiblingId = _getTreeData.previousSiblingId;


        var path = [].concat(_toConsumableArray(getTreeData().path));
        var targetPath = hoverPath;

        var targetIndex = hoverIndex;
        var targetParentId = hoverParentId;

        // cant drop root
        if (index === -1) {
            return;
        }

        // cant drop child into a path that contains itself
        if (hoverPath.indexOf(id) !== -1) {
            return;
        }

        // Determine rectangle on screen
        var hoverBoundingRect = (0, _reactDom.findDOMNode)(component).getBoundingClientRect();

        // Get vertical middle
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        var clientOffset = monitor.getClientOffset();
        var mouseX = clientOffset.x;

        // Get pixels to the top
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // if hover occurs over the grabbed row, we need to determine
        // if X position indicates left or right
        if (hoverIndex === index && parentId === hoverParentId) {

            // if a previous X position hasn't been set
            // set, and early return for next hover event
            if (!lastX) {
                monitor.getItem().lastX = mouseX;
                return;
            }

            // X position indicates a move to left
            else if (lastX - DRAG_INCREMENT > mouseX && parentId !== -1 && isLastChild) {

                    targetParentId = path[path.length - 2];
                    targetIndex = (parentIndex || 0) + 1;
                    targetPath.pop();
                }

                // X position indicates a move to right
                else if (lastX + DRAG_INCREMENT < mouseX && !isFirstChild) {
                        targetParentId = previousSiblingId;
                        targetIndex = previousSiblingTotalChildren;
                        targetPath.push(targetParentId);
                    }

                    // if neither xposition indicates left or right
                    // early return
                    else {
                            return;
                        }
        } else {
            // Only perform the move when the mouse
            // has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (flatIndex < hoverFlatIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (flatIndex > hoverFlatIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // If hoverIsExpanded, put item as first child instead
            // instead of placing it as a sibling below hovered item
            if (flatIndex < hoverFlatIndex && hoverIsExpanded) {
                targetIndex = 0;
                targetParentId = hoverId;
                targetPath.push(targetParentId);
            }
        }

        props.moveRow({ id: id, index: index, parentId: parentId, path: path }, { index: targetIndex, parentId: targetParentId, path: targetPath });

        monitor.getItem().lastX = mouseX;
    },
    drop: function drop(props) {
        var events = props.events;
        var getTreeData = props.getTreeData;
        var row = props.row;


        if (typeof events.HANDLE_AFTER_ROW_DROP === 'function') {
            events.HANDLE_AFTER_ROW_DROP({
                treeData: getTreeData(),
                row: row
            });
        }
    }
};

exports.default = (0, _RowContainer2.default)((0, _reactDnd.DropTarget)('ROW', rowTarget, function (connect) {
    return {
        connectDropTarget: connect.dropTarget()
    };
})((0, _reactDnd.DragSource)('ROW', rowSource, function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
})(Row)));