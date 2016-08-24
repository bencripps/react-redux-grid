'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRows = exports.getRowSelection = exports.getRowComponents = exports.TableRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Row = require('./table-row/Row');

var _Row2 = _interopRequireDefault(_Row);

var _PlaceHolder = require('./row/PlaceHolder');

var _isPluginEnabled = require('../../util/isPluginEnabled');

var _getCurrentRecords = require('../../util/getCurrentRecords');

var _getData = require('../../util/getData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf;
var bool = _react.PropTypes.bool;
var func = _react.PropTypes.func;
var number = _react.PropTypes.number;
var object = _react.PropTypes.object;
var oneOf = _react.PropTypes.oneOf;
var string = _react.PropTypes.string;

var TableRow = exports.TableRow = function (_Component) {
    _inherits(TableRow, _Component);

    _createClass(TableRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var columnManager = _props.columnManager;
            var columns = _props.columns;
            var dataSource = _props.dataSource;
            var editor = _props.editor;
            var editorState = _props.editorState;
            var emptyDataMessage = _props.emptyDataMessage;
            var events = _props.events;
            var gridType = _props.gridType;
            var menuState = _props.menuState;
            var pageSize = _props.pageSize;
            var pager = _props.pager;
            var plugins = _props.plugins;
            var reducerKeys = _props.reducerKeys;
            var readFunc = _props.readFunc;
            var selectedRows = _props.selectedRows;
            var selectionModel = _props.selectionModel;
            var showTreeRootNode = _props.showTreeRootNode;
            var stateKey = _props.stateKey;
            var store = _props.store;


            var pageIndex = pager && pager.pageIndex ? pager.pageIndex : 0;

            var rows = getRowSelection(dataSource, pageIndex, pageSize, pager, plugins, stateKey, store);

            var rowComponents = getRows(columns, columnManager, editor, editorState, gridType, menuState, reducerKeys, readFunc, rows, events, plugins, selectionModel, selectedRows, showTreeRootNode, stateKey, store);

            var rowInsert = Array.isArray(rowComponents) && rowComponents.length > 0 ? rowComponents : _react2.default.createElement(_PlaceHolder.PlaceHolder, { emptyDataMessage: emptyDataMessage });

            return _react2.default.createElement(
                'tbody',
                null,
                rowInsert
            );
        }
    }]);

    function TableRow(props) {
        _classCallCheck(this, TableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TableRow).call(this, props));
    }

    return TableRow;
}(_react.Component);

TableRow.propTypes = {
    columnManager: object.isRequired,
    columns: arrayOf(object).isRequired,
    data: arrayOf(object),
    dataSource: object,
    editor: object,
    editorState: object,
    emptyDataMessage: string,
    events: object,
    gridType: oneOf(['tree', 'grid']),
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
    store: object.isRequired
};
TableRow.defaultProps = {
    emptyDataMessage: 'No Data Available'
};
var getRowComponents = exports.getRowComponents = function getRowComponents(columns, columnManager, editor, editorState, gridType, menuState, reducerKeys, readFunc, row, events, plugins, selectionModel, selectedRows, showTreeRootNode, stateKey, store, index) {

    var key = (0, _getData.getRowKey)(columns, row, index);

    return _react2.default.createElement(_Row2.default, _extends({
        key: key
    }, {
        columns: columns,
        columnManager: columnManager,
        editor: editor,
        editorState: editorState,
        gridType: gridType,
        menuState: menuState,
        reducerKeys: reducerKeys,
        readFunc: readFunc,
        row: row,
        events: events,
        plugins: plugins,
        selectionModel: selectionModel,
        selectedRows: selectedRows,
        showTreeRootNode: showTreeRootNode,
        stateKey: stateKey,
        store: store,
        index: index
    }));
};

var getRowSelection = exports.getRowSelection = function getRowSelection(dataSource, pageIndex, pageSize, pager, plugins) {
    if (!dataSource) {
        return false;
    }

    if (!(0, _isPluginEnabled.isPluginEnabled)(plugins, 'PAGER') || plugins.PAGER.pagingType === 'remote') {
        return dataSource.data;
    }

    return (0, _getCurrentRecords.getCurrentRecords)(dataSource, pageIndex, pageSize);
};

var getRows = exports.getRows = function getRows(columns, columnManager, editor, editorState, gridType, menuState, reducerKeys, readFunc, rows, events, plugins, selectionModel, selectedRows, showTreeRootNode, stateKey, store) {

    return Array.isArray(rows) ? rows.map(function (row, i) {
        return getRowComponents(columns, columnManager, editor, editorState, gridType, menuState, reducerKeys, readFunc, row, events, plugins, selectionModel, selectedRows, showTreeRootNode, stateKey, store, i);
    }) : null;
};

exports.default = TableRow;