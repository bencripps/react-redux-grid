'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isColumnResizable = exports.getWidth = exports.isSortable = exports.handleColumnClick = exports.handleSort = exports.handleDrop = exports.Column = undefined;
var _arguments = arguments;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DragHandle = require('./column/DragHandle');

var _SortHandle = require('./column/SortHandle');

var _Text = require('./column/Text');

var _keyGenerator = require('./../../../util/keyGenerator');

var _prefix = require('./../../../util/prefix');

var _GridConstants = require('./../../../constants/GridConstants');

var _ColumnManager = require('./../../../actions/core/ColumnManager');

var _GridActions = require('./../../../actions/GridActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

var Column = exports.Column = function Column(_ref) {
    var scope = _ref.scope;
    var col = _ref.col;
    var columns = _ref.columns;
    var columnManager = _ref.columnManager;
    var dataSource = _ref.dataSource;
    var dragAndDropManager = _ref.dragAndDropManager;
    var pager = _ref.pager;
    var store = _ref.store;
    var stateKey = _ref.stateKey;
    var index = _ref.index;


    if (col.hidden) {
        return false;
    }

    var isResizable = isColumnResizable(col, columnManager);

    var sortable = isSortable(col, columnManager);

    var visibleColumns = columns.filter(function (_col) {
        return !_col.hidden;
    });

    var direction = col.sortDirection || col.defaultSortDirection || _GridConstants.SORT_DIRECTIONS.ASCEND;

    var sortHandleCls = col.sortDirection ? (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SORT_HANDLE_VISIBLE) : '';

    var key = (0, _keyGenerator.keyGenerator)(col.name, 'grid-column');

    var nextColumnKey = visibleColumns && visibleColumns[index + 1] ? (0, _keyGenerator.keyGenerator)(visibleColumns[index + 1].name, 'grid-column') : null;

    var handleDrag = scope.handleDrag.bind(scope, scope, columns, key, columnManager, store, nextColumnKey, stateKey);

    var sortHandle = sortable ? _react2.default.createElement(_SortHandle.SortHandle, {
        col: col,
        columns: columns,
        columnManager: columnManager,
        dataSource: dataSource,
        direction: direction,
        pager: pager,
        sortHandleCls: sortHandleCls,
        store: store }) : null;

    var dragHandle = isResizable ? _react2.default.createElement(_DragHandle.DragHandle, { col: col, dragAndDropManager: dragAndDropManager, handleDrag: handleDrag }) : null;

    var headerClass = col.className ? col.className + ' ' + (isResizable ? (0, _prefix.prefix)('resizable') : '') : '' + (isResizable ? (0, _prefix.prefix)('resizable') : '');

    if (sortHandleCls) {
        headerClass = headerClass + ' ' + sortHandleCls;
    }

    if (col.sortable) {
        headerClass = headerClass + ' ' + (0, _prefix.prefix)('is-sortable');
    }

    var clickArgs = {
        columns: columns,
        col: col,
        columnManager: columnManager,
        dataSource: dataSource,
        direction: direction,
        pager: pager,
        stateKey: stateKey,
        store: store
    };

    var headerProps = {
        className: headerClass,
        onClick: handleColumnClick.bind(scope, clickArgs),
        onDrop: handleDrop.bind(scope, index, columns, stateKey, store),
        onDragOver: function onDragOver(reactEvent) {
            reactEvent.preventDefault();
        },
        key: key,
        style: {
            width: getWidth(col, key, columns, columnManager.config.defaultColumnWidth, index)
        }
    };

    if (!isChrome) {
        headerProps.onDragOver = function (reactEvent) {
            // due to a bug in firefox, we need to set a global to
            // preserve the x coords
            // http://stackoverflow.com/questions/11656061/event-clientx-showing-as-0-in-firefox-for-dragend-event
            window.reactGridXcoord = reactEvent.clientX;
            reactEvent.preventDefault();
        };
    }

    var innerHTML = _react2.default.createElement(_Text.Text, { col: col,
        index: index,
        columnManager: columnManager,
        dragAndDropManager: dragAndDropManager,
        sortHandle: sortHandle });

    return _react2.default.createElement(
        'th',
        headerProps,
        innerHTML,
        dragHandle
    );
};

Column.propTypes = {
    col: _react.PropTypes.object,
    columnManager: _react.PropTypes.object,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object),
    dataSource: _react.PropTypes.object,
    dragAndDropManager: _react.PropTypes.object,
    index: _react.PropTypes.number,
    pager: _react.PropTypes.object,
    scope: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object
};

var handleDrop = exports.handleDrop = function handleDrop(droppedIndex, columns, stateKey, store, reactEvent) {

    reactEvent.preventDefault();
    try {
        var colData = reactEvent && reactEvent.dataTransfer.getData ? JSON.parse(reactEvent.dataTransfer.getData('Text')) : null;

        if (colData) {
            store.dispatch((0, _ColumnManager.reorderColumn)({
                draggedIndex: colData.index,
                droppedIndex: droppedIndex,
                columns: columns,
                stateKey: stateKey
            }));
        }
    } catch (e) {
        console.warn('Invalid drop');
    }
};

var handleSort = exports.handleSort = function handleSort(columns, col, columnManager, dataSource, direction, pager, stateKey, store) {

    var newDirection = direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? _GridConstants.SORT_DIRECTIONS.DESCEND : _GridConstants.SORT_DIRECTIONS.ASCEND;

    store.dispatch((0, _GridActions.setSortDirection)({
        columns: columns,
        id: col.id,
        sortDirection: newDirection,
        stateKey: stateKey
    }));

    if (columnManager.config.sortable.method.toUpperCase() === _GridConstants.SORT_METHODS.LOCAL) {
        columnManager.doSort({
            method: _GridConstants.SORT_METHODS.LOCAL,
            column: col,
            direction: newDirection,
            dataSource: dataSource,
            pagerState: null,
            stateKey: stateKey
        });
    } else if (columnManager.config.sortable.method.toUpperCase() === _GridConstants.SORT_METHODS.REMOTE) {
        columnManager.doSort({
            method: _GridConstants.SORT_METHODS.REMOTE,
            column: col,
            direction: newDirection,
            dataSource: dataSource,
            pagerState: pager,
            stateKey: stateKey
        });
    } else {
        console.warn('Sort method not defined!');
    }
};

var handleColumnClick = exports.handleColumnClick = function handleColumnClick(_ref2) {
    var columns = _ref2.columns;
    var col = _ref2.col;
    var columnManager = _ref2.columnManager;
    var dataSource = _ref2.dataSource;
    var direction = _ref2.direction;
    var pager = _ref2.pager;
    var stateKey = _ref2.stateKey;
    var store = _ref2.store;


    if (col.sortable) {
        handleSort(columns, col, columnManager, dataSource, direction, pager, stateKey, store);
    }

    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(undefined, _arguments);
    }
};

var isSortable = exports.isSortable = function isSortable(col, columnManager) {

    if (col.sortable !== undefined) {
        return col.sortable;
    } else if (columnManager.config.sortable.enabled !== undefined) {
        return columnManager.config.sortable.enabled;
    }

    return columnManager.config.defaultSortable;
};

var getWidth = exports.getWidth = function getWidth(col, key, columns, defaultColumnWidth) {

    var visibleColumns = columns.filter(function (_col) {
        return !_col.hidden;
    });
    var lastColumn = visibleColumns[visibleColumns.length - 1];
    var isLastColumn = lastColumn && lastColumn.name === col.name;
    var totalWidth = columns.reduce(function (a, _col) {
        if (_col.hidden) {
            return a + 0;
        }
        return a + parseFloat(_col.width || defaultColumnWidth);
    }, 0);

    var width = col.width || defaultColumnWidth;

    if (isLastColumn && totalWidth !== 0 && totalWidth < 100) {
        width = 100 - (totalWidth - parseFloat(width)) + '%';
    }

    return width;
};

var isColumnResizable = exports.isColumnResizable = function isColumnResizable(col, columnManager) {

    if (col.resizable !== undefined) {
        return col.resizable;
    } else if (columnManager.config.resizable !== undefined) {
        return columnManager.config.resizable;
    }

    return columnManager.config.defaultResizable;
};