'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getTreeData = exports.TableRow = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

var _isPluginEnabled = require('../../util/isPluginEnabled');

var _buffer = require('../../util/buffer');

var buffer = _interopRequireWildcard(_buffer);

var _prefix = require('../../util/prefix');

var _getCurrentRecords = require('../../util/getCurrentRecords');

var _getData = require('../../util/getData');

var _GridActions = require('../../actions/GridActions');

var _GridConstants = require('./../../constants/GridConstants');

var _Row = require('./table-row/Row');

var _Row2 = _interopRequireDefault(_Row);

var _PlaceHolder = require('./row/PlaceHolder');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-set-state */


var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    func = _react.PropTypes.func,
    number = _react.PropTypes.number,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;

var TableRow = exports.TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    _createClass(TableRow, [{
        key: 'render',
        value: function render() {
            var dataSource = this.props.dataSource;


            var totalCount = dataSource && _immutable.List.isList(dataSource.currentRecords) ? dataSource.currentRecords.count() : 0;

            this._rows = this.rowSelection();

            return _react2.default.createElement(
                'tbody',
                null,
                this.infiniteSpacer('bufferTop', totalCount),
                this._rows.map(this.toRowComponents()),
                this.infiniteSpacer('bufferBottom', totalCount),
                this.emptyData(totalCount)
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
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var containerHeight = _this.props.containerHeight;
            var _this$state = _this.state,
                rowHeight = _this$state.rowHeight,
                viewableCount = _this$state.viewableCount;


            var tbody = _reactDom2.default.findDOMNode(_this);

            var rows = tbody ? (0, _arrayFrom2.default)(tbody.querySelectorAll('.' + (0, _prefix.prefix)(CLASS_NAMES.ROW))) : null;

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

        _this.findRow = function (predicate) {
            return _this._rows.find(predicate);
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

        _this.rowSelection = function () {
            var _this$props2 = _this.props,
                dataSource = _this$props2.dataSource,
                infinite = _this$props2.infinite,
                pager = _this$props2.pager,
                pageSize = _this$props2.pageSize,
                plugins = _this$props2.plugins;
            var _this$state2 = _this.state,
                viewableIndex = _this$state2.viewableIndex,
                viewableCount = _this$state2.viewableCount;


            if (!dataSource) {
                return (0, _immutable.List)();
            }

            if (!infinite && (!(0, _isPluginEnabled.isPluginEnabled)(plugins, 'PAGER') || plugins.PAGER.pagingType === 'remote')) {
                return dataSource.data;
            }

            return (0, _getCurrentRecords.getCurrentRecords)(dataSource, pager && pager.pageIndex ? pager.pageIndex : 0, pageSize, infinite, viewableIndex, viewableCount, _GridConstants.BUFFER_MULTIPLIER).data;
        };

        _this.toRowComponents = function () {
            return function (row, index, rows) {
                return _react2.default.createElement(_Row2.default, {
                    columnManager: _this.props.columnManager,
                    columns: _this.props.columns,
                    dragAndDrop: _this.props.dragAndDrop,
                    editor: _this.props.editor,
                    editorState: _this.props.editorState,
                    emptyDataMessage: _this.props.emptyDataMessage,
                    events: _this.props.events,
                    findRow: _this.findRow,
                    gridType: _this.props.gridType,
                    index: index,
                    key: (0, _getData.getRowKey)(_this.props.columns, row),
                    menuState: _this.props.menuState,
                    moveRow: _this.moveRow,
                    nextRow: rows.get(index + 1),
                    plugins: _this.props.plugins,
                    previousRow: rows.get(index - 1),
                    readFunc: _this.props.readFunc,
                    reducerKeys: _this.props.reducerKeys,
                    row: row,
                    selectedRows: _this.props.selectedRows,
                    selectionModel: _this.props.selectionModel,
                    showTreeRootNode: _this.props.showTreeRootNode,
                    stateKey: _this.props.stateKey,
                    stateful: _this.props.stateful,
                    store: _this.props.store,
                    treeData: getTreeData(row)
                });
            };
        };

        _this.infiniteSpacer = function (method, totalCount) {
            var infinite = _this.props.infinite;
            var _this$state3 = _this.state,
                rowHeight = _this$state3.rowHeight,
                viewableCount = _this$state3.viewableCount,
                viewableIndex = _this$state3.viewableIndex;


            if (infinite && totalCount) {

                var style = {
                    height: buffer[method](rowHeight, viewableIndex, viewableCount, _GridConstants.BUFFER_MULTIPLIER, totalCount)
                };

                return _react2.default.createElement('tr', {
                    key: 'row-inifinite-' + method,
                    style: style
                });
            }
        };

        _this.emptyData = function (totalCount) {
            return totalCount ? undefined : _react2.default.createElement(_PlaceHolder.PlaceHolder, {
                emptyDataMessage: _this.props.emptyDataMessage
            });
        };

        _this.state = {
            viewableIndex: 0,
            rowHeight: _GridConstants.ROW_HEIGHT,
            viewableCount: _GridConstants.DEFAULT_VIEWABLE_RECORDS
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
    gridType: _GridConstants.GRID_TYPES,
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
var getTreeData = exports.getTreeData = function getTreeData(row) {
    return {
        depth: row.get('_depth'),
        parentId: row.get('_parentId'),
        id: row.get('_id'),
        index: row.get('_index'),
        flatIndex: row.get('_flatIndex'),
        leaf: row.get('_leaf'),
        hasChildren: row.get('_hasChildren'),
        isExpanded: row.get('_isExpanded'),
        isLastChild: row.get('_isLastChild'),
        isFirstChild: row.get('_isFirstChild'),
        previousSiblingId: row.get('_previousSiblingId'),
        previousSiblingTotalChildren: row.get('_previousSiblingTotalChilden'),
        previousSiblingChildIds: row.get('_previousSiblingChildIds'),
        parentTotalChildren: row.get('_parentTotalChildren'),
        parentIndex: row.get('_parentIndex'),
        indexPath: row.get('_indexPath'),
        path: row.get('_path')
    };
};

exports.default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2.default)(TableRow);