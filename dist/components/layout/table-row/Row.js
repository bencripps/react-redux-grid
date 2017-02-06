'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleRowSingleClickEvent = exports.getSelectedText = exports.handleRowDoubleClickEvent = exports.addEmptyCells = exports.getCellData = exports.addEmptyInsert = exports.getCellValues = exports.Row = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

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

var _fire = require('../../../util/fire');

var _getData = require('../../../util/getData');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string,
    oneOf = _react.PropTypes.oneOf,
    number = _react.PropTypes.number;


var DRAG_INCREMENT = 15;

var Row = exports.Row = function (_Component) {
    _inherits(Row, _Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                columnManager = _props.columnManager,
                columns = _props.columns,
                connectDragSource = _props.connectDragSource,
                connectDropTarget = _props.connectDropTarget,
                dragAndDrop = _props.dragAndDrop,
                editor = _props.editor,
                editorState = _props.editorState,
                events = _props.events,
                gridType = _props.gridType,
                index = _props.index,
                isDragging = _props.isDragging,
                menuState = _props.menuState,
                plugins = _props.plugins,
                readFunc = _props.readFunc,
                reducerKeys = _props.reducerKeys,
                row = _props.row,
                selectedRows = _props.selectedRows,
                selectionModel = _props.selectionModel,
                showTreeRootNode = _props.showTreeRootNode,
                stateful = _props.stateful,
                stateKey = _props.stateKey,
                store = _props.store,
                treeData = _props.treeData;


            var id = row.get('_key');

            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });
            var cellValues = getCellValues(columns, row);

            if (Object.keys(row).length !== columns.length) {
                addEmptyCells(row, columns);
            }

            var isSelected = selectedRows ? selectedRows.get(id) : false;

            var cells = Object.keys(cellValues).map(function (k, i) {

                var key = (0, _getData.getRowKey)(columns, row, columns[i].dataIndex);
                var cellData = getCellData(columns, editor, editorState, row, k, i, store);
                var cellTreeData = Object.assign({}, treeData, {
                    expandable: columns[i].expandable
                });

                return _react2.default.createElement(_Cell.Cell, {
                    cellData: cellData,
                    columns: columns,
                    dragAndDrop: dragAndDrop,
                    editor: editor,
                    editorState: editorState,
                    events: events,
                    gridType: gridType,
                    index: i,
                    isRowSelected: isSelected,
                    key: key,
                    readFunc: readFunc,
                    reducerKeys: reducerKeys,
                    row: cellValues,
                    rowId: id,
                    rowIndex: index,
                    selectionModel: selectionModel,
                    showTreeRootNode: showTreeRootNode,
                    stateKey: stateKey,
                    stateful: stateful,
                    store: store,
                    treeData: cellTreeData
                });
            });

            var editClass = editorState && editorState.get(id) && editor.config.type !== 'grid' ? selectionModel.defaults.editCls : '';

            var selectedClass = isSelected ? selectionModel.defaults.activeCls : '';

            var dragClass = isDragging ? CLASS_NAMES.ROW_IS_DRAGGING : '';

            var rowProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.ROW, selectedClass, editClass, dragClass),
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
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(e) {
            var row = this.props.row;

            // this has nothing to do with grid drag and drop
            // only use is setting meta data for custom drop events
            // per issue #59

            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: row.get('_key'),
                data: row.toJS()
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
    findRow: func.isRequired,
    gridType: oneOf(['tree', 'grid']),
    index: number,
    isDragging: bool,
    menuState: object,
    nextRow: object,
    pageSize: number,
    pager: object,
    plugins: object,
    previousRow: object,
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
        result[idx] = row.get(idx);
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

    var rowId = row.get('_key');

    // if a renderer is present, but
    // were in edited mode, we should use the edited values
    // since those could be modified using a 'change' function
    var editedValues = editorState && editorState.get(rowId) && editorState.get(rowId).values ? editorState.get(rowId).values : new Map();

    var valueAtDataIndex = (0, _getData.getData)(row, columns, index, editedValues);

    // if a render has been provided, default to this
    // as long as editor type isnt 'grid'
    if (row && columns[index] && columns[index].renderer && typeof columns[index].renderer === 'function') {
        return columns[index].renderer({
            column: columns[index],
            value: valueAtDataIndex,
            row: row.toJS(),
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

var addEmptyCells = exports.addEmptyCells = function addEmptyCells(row, columns) {

    columns.forEach(function (col) {

        // const data = nameFromDataIndex(col);
        // come back to this
        // how we retrieve and store data, especially editable
        // may need to be updated based on array dataIndex

        if (row && !row.get(col.dataIndex)) {
            row.set(col.dataIndex, '');
        }
    });

    return row;
};

var handleRowDoubleClickEvent = exports.handleRowDoubleClickEvent = function handleRowDoubleClickEvent(events, row, rowId, selectionModel, index, isSelected, reactEvent, id, browserEvent) {
    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index,
            data: row,
            selected: !isSelected
        });
    }

    (0, _fire.fireEvent)('HANDLE_ROW_DOUBLE_CLICK', events, {
        id: id,
        isSelected: isSelected,
        row: row,
        rowId: rowId
    }, browserEvent);
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

var handleRowSingleClickEvent = exports.handleRowSingleClickEvent = function handleRowSingleClickEvent(events, row, rowId, selectionModel, index, isSelected, reactEvent, id, browserEvent) {

    if (getSelectedText()) {
        return false;
    }

    var beforeRowSingleClick = (0, _fire.fireEvent)('HANDLE_BEFORE_ROW_CLICK', events, {
        row: row,
        rowId: rowId,
        id: id
    }, browserEvent);

    if (beforeRowSingleClick === false) {
        return;
    }

    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index,
            data: row,
            selected: !isSelected
        });
    }

    (0, _fire.fireEvent)('HANDLE_ROW_CLICK', events, {
        id: id,
        isSelected: isSelected,
        row: row,
        rowId: rowId,
        rowOndex: index
    }, browserEvent);
};

var rowSource = {
    beginDrag: function beginDrag(_ref) {
        var getTreeData = _ref.getTreeData,
            row = _ref.row;

        return {
            getTreeData: getTreeData,
            _id: row.get('_id'),
            _index: row.get('_index'),
            _parentId: row.get('_parentId'),
            _path: row.get('_path')
        };
    },
    endDrag: function endDrag(_ref2, monitor) {
        var getTreeData = _ref2.getTreeData,
            moveRow = _ref2.moveRow;

        var _getTreeData = getTreeData(),
            id = _getTreeData.id,
            index = _getTreeData.index,
            parentId = _getTreeData.parentId,
            path = _getTreeData.path;

        var _monitor$getItem = monitor.getItem(),
            _index = _monitor$getItem._index,
            _parentId = _monitor$getItem._parentId,
            _path = _monitor$getItem._path;

        if (!monitor.didDrop()) {
            moveRow({ id: id, index: index, parentId: parentId, path: path }, { index: _index, parentId: _parentId, path: _path });
        }
    }
};

var rowTarget = {
    hover: function hover(props, monitor, component) {
        var hoverEvents = props.events,
            hoverRow = props.row,
            hoverPreviousRow = props.previousRow;
        var _props$treeData = props.treeData,
            hoverIndex = _props$treeData.index,
            hoverId = _props$treeData.id,
            hoverIsExpanded = _props$treeData.isExpanded,
            hoverParentId = _props$treeData.parentId,
            hoverPath = _props$treeData.path,
            hoverFlatIndex = _props$treeData.flatIndex;

        var _monitor$getItem2 = monitor.getItem(),
            lastX = _monitor$getItem2.lastX,
            getTreeData = _monitor$getItem2.getTreeData,
            row = _monitor$getItem2.row;

        var _getTreeData2 = getTreeData(),
            id = _getTreeData2.id,
            index = _getTreeData2.index,
            parentId = _getTreeData2.parentId,
            isLastChild = _getTreeData2.isLastChild,
            isFirstChild = _getTreeData2.isFirstChild,
            flatIndex = _getTreeData2.flatIndex,
            parentIndex = _getTreeData2.parentIndex,
            previousSiblingTotalChildren = _getTreeData2.previousSiblingTotalChildren,
            previousSiblingId = _getTreeData2.previousSiblingId;

        var path = [].concat(_toConsumableArray(getTreeData().path.toJS()));
        var targetPath = hoverPath.toJS();

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

                        var validDrop = (0, _fire.fireEvent)('HANDLE_BEFORE_TREE_CHILD_CREATE', hoverEvents, {
                            row: row,
                            previousRow: hoverPreviousRow
                        }, null);

                        if (validDrop === false) {
                            return;
                        }
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
                var _validDrop = (0, _fire.fireEvent)('HANDLE_BEFORE_TREE_CHILD_CREATE', hoverEvents, {
                    row: row,
                    hoverRow: hoverRow
                }, null);

                if (_validDrop === false) {
                    return;
                }

                targetIndex = 0;
                targetParentId = hoverId;
                targetPath.push(targetParentId);
            }
        }

        props.moveRow({ id: id, index: index, parentId: parentId, path: path }, { index: targetIndex, parentId: targetParentId, path: targetPath });

        monitor.getItem().lastX = mouseX;
    },
    drop: function drop(props, monitor) {
        var events = props.events,
            getTreeData = props.getTreeData,
            findRow = props.findRow;

        var _monitor$getItem3 = monitor.getItem(),
            _id = _monitor$getItem3._id;

        var row = findRow(function (data) {
            return data.get('_id') === _id;
        });

        if (row) {
            (0, _fire.fireEvent)('HANDLE_AFTER_ROW_DROP', events, Object.assign({
                row: row
            }, getTreeData()), null);
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