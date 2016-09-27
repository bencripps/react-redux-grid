'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedGrid = exports.Grid = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Header = require('./layout/Header');

var _Header2 = _interopRequireDefault(_Header);

var _FixedHeader = require('./layout/FixedHeader');

var _FixedHeader2 = _interopRequireDefault(_FixedHeader);

var _TableRow = require('./layout/TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Pager = require('./plugins/pager/Pager');

var _Message = require('./plugins/errorhandler/Message');

var _Toolbar = require('./plugins/bulkactions/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _LoadingBar = require('./plugins/loader/LoadingBar');

var _LoadingBar2 = _interopRequireDefault(_LoadingBar);

var _ColumnManager = require('./core/ColumnManager');

var _ColumnManager2 = _interopRequireDefault(_ColumnManager);

var _Model = require('./plugins/selection/Model');

var _Model2 = _interopRequireDefault(_Model);

var _Manager = require('./plugins/editor/Manager');

var _Manager2 = _interopRequireDefault(_Manager);

var _prefix = require('../util/prefix');

var _GridConstants = require('../constants/GridConstants');

var _GridActions = require('../actions/GridActions');

var _mapStateToProps = require('../util/mapStateToProps');

var _shouldComponentUpdate = require('../util/shouldComponentUpdate');

var _isPluginEnabled = require('../util/isPluginEnabled');

var _getColumnsFromStorage = require('../util/getColumnsFromStorage');

var _LocalStorageManager = require('./core/LocalStorageManager');

var _LocalStorageManager2 = _interopRequireDefault(_LocalStorageManager);

require('./../style/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _arrayFrom2.default)(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var any = _react.PropTypes.any;
var array = _react.PropTypes.array;
var arrayOf = _react.PropTypes.arrayOf;
var bool = _react.PropTypes.bool;
var object = _react.PropTypes.object;
var oneOf = _react.PropTypes.oneOf;
var oneOfType = _react.PropTypes.oneOfType;
var number = _react.PropTypes.number;
var string = _react.PropTypes.string;

var Grid = function (_Component) {
    _inherits(Grid, _Component);

    _createClass(Grid, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var classNames = _props.classNames;
            var dragAndDrop = _props.dragAndDrop;
            var columnState = _props.columnState;
            var gridData = _props.gridData;
            var emptyDataMessage = _props.emptyDataMessage;
            var height = _props.height;
            var loadingState = _props.loadingState;
            var pageSize = _props.pageSize;
            var plugins = _props.plugins;
            var events = _props.events;
            var reducerKeys = _props.reducerKeys;
            var stateKey = _props.stateKey;
            var store = _props.store;
            var pager = _props.pager;
            var editorState = _props.editorState;
            var selectedRows = _props.selectedRows;
            var stateful = _props.stateful;
            var menuState = _props.menuState;
            var showTreeRootNode = _props.showTreeRootNode;


            var columns = columnState && columnState.columns ? columnState.columns : [];

            var editorComponent = this.editor.getComponent(plugins, reducerKeys, store, events, this.selectionModel, this.editor, columns);

            var containerProps = {
                className: _prefix.prefix.apply(undefined, [_GridConstants.CLASS_NAMES.CONTAINER].concat(_toConsumableArray(classNames)))
            };

            var messageProps = {
                reducerKeys: reducerKeys,
                store: store
            };

            var bulkActionProps = {
                plugins: plugins,
                reducerKeys: reducerKeys,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store
            };

            var bulkActionCmp = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'BULK_ACTIONS') ? _react2.default.createElement(_Toolbar2.default, bulkActionProps) : null;

            var headerProps = {
                columnManager: this.columnManager,
                columns: columns,
                plugins: plugins,
                reducerKeys: reducerKeys,
                dataSource: gridData,
                pager: pager,
                columnState: columnState,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store,
                stateful: stateful,
                visible: false,
                menuState: menuState,
                gridType: this.gridType
            };

            var fixedHeaderProps = Object.assign({
                visible: true,
                gridData: gridData
            }, headerProps);

            var tableContainerProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.TABLE_CONTAINER),
                style: {
                    height: height
                }
            };

            var rowProps = {
                columnManager: this.columnManager,
                columns: columns,
                dragAndDrop: dragAndDrop,
                editor: this.editor,
                emptyDataMessage: emptyDataMessage,
                columnState: columnState,
                dataSource: gridData,
                readFunc: this.setData.bind(this),
                pager: pager,
                editorState: editorState,
                selectedRows: selectedRows,
                events: events,
                pageSize: pageSize,
                plugins: plugins,
                reducerKeys: reducerKeys,
                selectionModel: this.selectionModel,
                stateKey: stateKey,
                store: store,
                showTreeRootNode: showTreeRootNode,
                menuState: menuState,
                gridType: this.gridType
            };

            var tableProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.TABLE, _GridConstants.CLASS_NAMES.HEADER_HIDDEN),
                cellSpacing: 0
            };

            var pagerProps = {
                dataSource: gridData,
                pageSize: pageSize,
                plugins: plugins,
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                store: store
            };

            var loadingBarProps = {
                plugins: plugins,
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                store: store,
                loadingState: loadingState
            };

            return _react2.default.createElement(
                'div',
                containerProps,
                _react2.default.createElement(_Message.Message, messageProps),
                bulkActionCmp,
                _react2.default.createElement(_FixedHeader2.default, fixedHeaderProps),
                _react2.default.createElement(
                    'div',
                    tableContainerProps,
                    _react2.default.createElement(
                        'table',
                        tableProps,
                        _react2.default.createElement(_Header2.default, headerProps),
                        _react2.default.createElement(_TableRow2.default, rowProps)
                    ),
                    editorComponent
                ),
                _react2.default.createElement(_Pager.ConnectedPagerToolbar, pagerProps),
                _react2.default.createElement(_LoadingBar2.default, loadingBarProps)
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props2 = this.props;
            var columns = _props2.columns;
            var dataSource = _props2.dataSource;
            var gridType = _props2.gridType;
            var events = _props2.events;
            var plugins = _props2.plugins;
            var reducerKeys = _props2.reducerKeys;
            var stateKey = _props2.stateKey;
            var store = _props2.store;


            this.gridType = gridType === 'tree' ? 'tree' : 'grid';

            if (!store || !store.dispatch) {
                throw new Error('Component must be intialized with a valid store');
            }

            if (!stateKey) {
                throw new Error('A stateKey is required to intialize the grid');
            }

            this.setColumns();

            this.setData();

            this.columnManager.init({
                plugins: plugins,
                store: store,
                events: events,
                selectionModel: this.selectionModel,
                editor: this.editor,
                columns: columns,
                dataSource: dataSource,
                reducerKeys: reducerKeys
            });

            this.selectionModel.init(plugins, stateKey, store, events);

            this.editor.init(plugins, stateKey, store, events);
        }
    }]);

    function Grid(props) {
        _classCallCheck(this, Grid);

        var _this = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldGridUpdate.bind(_this);

        _this.columnManager = new _ColumnManager2.default();

        _this.editor = new _Manager2.default();

        _this.selectionModel = new _Model2.default();
        return _this;
    }

    _createClass(Grid, [{
        key: 'setData',
        value: function setData() {
            var extraParams = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var _props3 = this.props;
            var dataSource = _props3.dataSource;
            var data = _props3.data;
            var expandOnLoad = _props3.expandOnLoad;
            var showTreeRootNode = _props3.showTreeRootNode;
            var stateKey = _props3.stateKey;
            var store = _props3.store;


            if (this.gridType === 'tree') {
                if (typeof dataSource === 'string' || typeof dataSource === 'function') {
                    store.dispatch((0, _GridActions.getAsyncData)({
                        stateKey: stateKey,
                        dataSource: dataSource,
                        type: 'tree',
                        showTreeRootNode: showTreeRootNode,
                        extraParams: _extends({}, extraParams, {
                            expandOnLoad: expandOnLoad
                        })
                    }));
                } else {
                    store.dispatch((0, _GridActions.setTreeData)({
                        stateKey: stateKey,
                        data: data,
                        showTreeRootNode: showTreeRootNode,
                        extraParams: _extends({}, extraParams, {
                            expandOnLoad: expandOnLoad
                        })
                    }));
                }
            } else if (this.gridType === 'grid') {
                if (typeof dataSource === 'string' || typeof dataSource === 'function') {
                    store.dispatch((0, _GridActions.getAsyncData)({ stateKey: stateKey, dataSource: dataSource, extraParams: extraParams }));
                } else if (data) {
                    store.dispatch((0, _GridActions.setData)({ stateKey: stateKey, data: data }));
                } else {
                    throw new Error('A data source, or a static data set is required');
                }
            }
        }
    }, {
        key: 'setColumns',
        value: function setColumns() {
            var _props4 = this.props;
            var columns = _props4.columns;
            var stateKey = _props4.stateKey;
            var store = _props4.store;
            var stateful = _props4.stateful;

            var savedColumns = columns;

            if (stateful) {
                savedColumns = (0, _getColumnsFromStorage.getColumnsFromStorage)(_LocalStorageManager2.default.getStateItem({ stateKey: stateKey, value: columns, property: 'columns' }), columns);
            }

            if (!columns) {
                throw new Error('A columns array is required');
            } else {
                store.dispatch((0, _GridActions.setColumns)({ columns: savedColumns, stateKey: stateKey, stateful: stateful }));
            }
        }
    }]);

    return Grid;
}(_react.Component);

Grid.propTypes = {
    classNames: array,
    columnState: object,
    columns: arrayOf(object).isRequired,
    data: arrayOf(object),
    dataSource: any,
    dragAndDrop: bool,
    editorState: object,
    emptyDataMessage: any,
    events: object,
    expandOnLoad: bool,
    gridData: object,
    gridType: oneOf(['tree', 'grid']),
    height: oneOfType([string, number]),
    loadingState: object,
    menuState: object,
    pageSize: number,
    pager: object,
    plugins: object,
    reducerKeys: object,
    selectedRows: object,
    showTreeRootNode: bool,
    stateKey: string,
    stateful: bool,
    store: object
};
Grid.defaultProps = {
    classNames: [],
    columns: [],
    events: {},
    height: '500px',
    pageSize: 25,
    reducerKeys: {},
    showTreeRootNode: false
};


var ConnectedGrid = (0, _reactRedux.connect)(_mapStateToProps.mapStateToProps)(Grid);

exports.Grid = Grid;
exports.ConnectedGrid = ConnectedGrid;