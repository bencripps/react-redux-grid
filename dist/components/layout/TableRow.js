'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTreeData = exports.getRows = exports.getRowSelection = exports.getRowComponents = exports.TableRow = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _isPluginEnabled = require('../../util/isPluginEnabled');

var _buffer = require('../../util/buffer');

var _prefix = require('../../util/prefix');

var _getCurrentRecords = require('../../util/getCurrentRecords');

var _getData = require('../../util/getData');

var _GridActions = require('../../actions/GridActions');

var _GridConstants = require('../../constants/GridConstants');

var _Row = require('./table-row/Row');

var _Row2 = _interopRequireDefault(_Row);

var _PlaceHolder = require('./row/PlaceHolder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-set-state */


var BUFFER_MULTIPLIER = 1.5;
var DEFAULT_VIEWABLE_RECORDS = 25;

var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    number = _react.PropTypes.number,
    object = _react.PropTypes.object,
    oneOf = _react.PropTypes.oneOf,
    string = _react.PropTypes.string;

var TableRow = exports.TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    _createClass(TableRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                columnManager = _props.columnManager,
                columns = _props.columns,
                containerScrollTop = _props.containerScrollTop,
                dataSource = _props.dataSource,
                dragAndDrop = _props.dragAndDrop,
                editor = _props.editor,
                editorState = _props.editorState,
                emptyDataMessage = _props.emptyDataMessage,
                events = _props.events,
                gridType = _props.gridType,
                infinite = _props.infinite,
                menuState = _props.menuState,
                pageSize = _props.pageSize,
                pager = _props.pager,
                plugins = _props.plugins,
                readFunc = _props.readFunc,
                reducerKeys = _props.reducerKeys,
                selectedRows = _props.selectedRows,
                selectionModel = _props.selectionModel,
                showTreeRootNode = _props.showTreeRootNode,
                stateKey = _props.stateKey,
                stateful = _props.stateful,
                store = _props.store;


            var pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

            var totalCount = dataSource && Array.isArray(dataSource.currentRecords) ? dataSource.currentRecords.length : 0;

            var _state = this.state,
                viewableCount = _state.viewableCount,
                viewableIndex = _state.viewableIndex,
                rowHeight = _state.rowHeight;


            var rows = getRowSelection(dataSource, infinite, pageIndex, pageSize, pager, plugins, viewableIndex, viewableCount, BUFFER_MULTIPLIER, stateKey, store);

            var rowComponents = getRows(columns, columnManager, dragAndDrop, editor, editorState, gridType, menuState, reducerKeys, readFunc, rows, events, this.moveRow, plugins, selectionModel, selectedRows, showTreeRootNode, stateful, stateKey, store, containerScrollTop, infinite, totalCount, rowHeight, viewableIndex, viewableCount, BUFFER_MULTIPLIER);

            var rowInsert = Array.isArray(rowComponents) && rowComponents.length > 0 ? rowComponents : _react2.default.createElement(_PlaceHolder.PlaceHolder, { emptyDataMessage: emptyDataMessage });

            return _react2.default.createElement(
                'tbody',
                null,
                rowInsert
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.calculateHeights();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var rowHeight = this.state.rowHeight;


            if (this.props.containerScrollTop !== nextProps.containerScrollTop) {
                this.setState({
                    viewableIndex: Math.floor(nextProps.containerScrollTop / rowHeight)
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.calculateHeights();
        }
    }]);

    function TableRow(props) {
        _classCallCheck(this, TableRow);

        var _this = _possibleConstructorReturn(this, (TableRow.__proto__ || Object.getPrototypeOf(TableRow)).call(this, props));

        _this.calculateHeights = function () {
            var containerHeight = _this.props.containerHeight;
            var _this$state = _this.state,
                rowHeight = _this$state.rowHeight,
                viewableCount = _this$state.viewableCount;


            var tbody = _reactDom2.default.findDOMNode(_this);

            var rows = tbody ? (0, _arrayFrom2.default)(tbody.querySelectorAll('.' + (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW))) : null;

            if (!rows.length) {
                return;
            }

            var nextRowHeight = Math.round(rows.reduce(function (prev, el) {
                return prev + el.clientHeight;
            }, 0) / rows.length);

            var nextState = {};

            if (rowHeight !== nextRowHeight && nextRowHeight !== undefined && !Number.isNaN(nextRowHeight)) {
                nextState.rowHeight = nextRowHeight;
            }

            var nextViewableCount = Math.ceil(containerHeight / rowHeight);

            if (nextViewableCount !== viewableCount && !Number.isNaN(nextViewableCount)) {
                nextState.viewableCount = nextViewableCount;
            }

            if (Object.keys(nextState).length) {
                _this.setState(nextState);
            }
        };

        _this.moveRow = function (current, next) {
            var _this$props = _this.props,
                stateKey = _this$props.stateKey,
                store = _this$props.store,
                showTreeRootNode = _this$props.showTreeRootNode;

            if (!_this.requestedFrame) {
                _this.requestedFrame = requestAnimationFrame(function () {
                    store.dispatch((0, _GridActions.moveNode)({
                        stateKey: stateKey,
                        store: store,
                        current: current,
                        next: next,
                        showTreeRootNode: showTreeRootNode
                    }));
                    _this.requestedFrame = null;
                });
            }
        };

        _this.state = {
            viewableIndex: 0,
            rowHeight: _GridConstants.ROW_HEIGHT,
            viewableCount: DEFAULT_VIEWABLE_RECORDS
        };
        return _this;
    }

    return TableRow;
}(_react.Component);

TableRow.propTypes = {
    columnManager: object.isRequired,
    columns: arrayOf(object).isRequired,
    containerHeight: number,
    containerScrollTop: number,
    data: arrayOf(object),
    dataSource: object,
    dragAndDrop: bool,
    editor: object,
    editorState: object,
    emptyDataMessage: string,
    events: object,
    gridType: oneOf(['tree', 'grid']),
    infinite: bool,
    menuState: object,
    pageSize: number,
    pager: object,
    plugins: object,
    readFunc: func,
    reducerKeys: object,
    selectedRows: object,
    selectionModel: object,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object.isRequired
};
TableRow.defaultProps = {
    emptyDataMessage: 'No Data Available'
};
var getRowComponents = exports.getRowComponents = function getRowComponents(columns, columnManager, dragAndDrop, editor, editorState, gridType, menuState, reducerKeys, readFunc, row, previousRow, events, moveRow, plugins, selectionModel, selectedRows, showTreeRootNode, stateful, stateKey, store, index) {

    var key = (0, _getData.getRowKey)(columns, row);

    return _react2.default.createElement(_Row2.default, _extends({
        key: key
    }, {
        columnManager: columnManager,
        columns: columns,
        dragAndDrop: dragAndDrop,
        editor: editor,
        editorState: editorState,
        events: events,
        gridType: gridType,
        index: index,
        menuState: menuState,
        moveRow: moveRow,
        plugins: plugins,
        reducerKeys: reducerKeys,
        readFunc: readFunc,
        row: row,
        previousRow: previousRow,
        selectedRows: selectedRows,
        selectionModel: selectionModel,
        showTreeRootNode: showTreeRootNode,
        stateful: stateful,
        stateKey: stateKey,
        store: store,
        treeData: getTreeData(row)
    }));
};

var getRowSelection = exports.getRowSelection = function getRowSelection(dataSource, infinite, pageIndex, pageSize, pager, plugins, viewableIndex, viewableCount, bufferMultiplier, stateKey, store) {

    if (!dataSource) {
        return false;
    }

    if (!(0, _isPluginEnabled.isPluginEnabled)(plugins, 'PAGER') && !infinite || plugins.PAGER.pagingType === 'remote' && !infinite) {
        return dataSource.data;
    }

    return (0, _getCurrentRecords.getCurrentRecords)(dataSource, pageIndex, pageSize, infinite, viewableIndex, viewableCount, bufferMultiplier).data;
};

var getRows = exports.getRows = function getRows(columns, columnManager, dragAndDrop, editor, editorState, gridType, menuState, reducerKeys, readFunc, rows, events, moveRow, plugins, selectionModel, selectedRows, showTreeRootNode, stateful, stateKey, store, containerScrollTop, infinite, totalCount, rowHeight, viewableIndex, viewableCount, bufferMultiplier) {

    var rowArray = Array.isArray(rows) ? rows.map(function (row, i) {
        return getRowComponents(columns, columnManager, dragAndDrop, editor, editorState, gridType, menuState, reducerKeys, readFunc, row, rows[i - 1], events, moveRow, plugins, selectionModel, selectedRows, showTreeRootNode, stateful, stateKey, store, i);
    }) : [];

    if (!infinite) {
        return rowArray;
    }

    var topProps = {
        style: {
            height: (0, _buffer.bufferTop)(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount)
        }
    };

    var bottomProps = {
        style: {
            height: (0, _buffer.bufferBottom)(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount)
        }
    };

    // adding buffer rows for infinite scroll
    rowArray.unshift(_react2.default.createElement('tr', _extends({
        key: 'row-inifinite-buffer-top'
    }, topProps)));
    rowArray.push(_react2.default.createElement('tr', _extends({
        key: 'row-inifinite-buffer-bottom'
    }, bottomProps)));

    return rowArray;
};

var getTreeData = exports.getTreeData = function getTreeData(row) {
    return {
        depth: row._depth,
        parentId: row._parentId,
        id: row._id,
        index: row._index,
        flatIndex: row._flatIndex,
        leaf: row._leaf,
        hasChildren: row._hasChildren,
        isExpanded: row._isExpanded,
        isLastChild: row._isLastChild,
        isFirstChild: row._isFirstChild,
        previousSiblingId: row._previousSiblingId,
        previousSiblingTotalChildren: row._previousSiblingTotalChilden,
        previousSiblingChildIds: row._previousSiblingChildIds,
        parentTotalChildren: row._parentTotalChildren,
        parentIndex: row._parentIndex,
        indexPath: row._indexPath,
        path: row._path
    };
};

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(TableRow);