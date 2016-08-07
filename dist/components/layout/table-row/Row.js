'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleRowSingleClickEvent = exports.getSelectedText = exports.handleRowDoubleClickEvent = exports.addEmptyCells = exports.getCellData = exports.addEmptyInsert = exports.getCellValues = exports.Row = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cell = require('./row/Cell');

var _EmptyCell = require('./row/EmptyCell');

var _keyGenerator = require('../../../util/keyGenerator');

var _shouldComponentUpdate = require('../../../util/shouldComponentUpdate');

var _prefix = require('../../../util/prefix');

var _getData = require('../../../util/getData');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = exports.Row = function (_Component) {
    _inherits(Row, _Component);

    _createClass(Row, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var columns = _props.columns;
            var columnManager = _props.columnManager;
            var editor = _props.editor;
            var editorState = _props.editorState;
            var menuState = _props.menuState;
            var reducerKeys = _props.reducerKeys;
            var row = _props.row;
            var events = _props.events;
            var plugins = _props.plugins;
            var selectionModel = _props.selectionModel;
            var selectedRows = _props.selectedRows;
            var stateKey = _props.stateKey;
            var store = _props.store;
            var index = _props.index;


            var id = (0, _keyGenerator.keyGenerator)('row', index);
            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });
            var cellValues = getCellValues(columns, row);

            if (Object.keys(row).length !== columns.length) {
                addEmptyCells(row, columns);
            }

            var cells = Object.keys(cellValues).map(function (k, i) {

                var cellProps = {
                    index: i,
                    rowId: id,
                    cellData: getCellData(columns, row, k, i, store),
                    columns: columns,
                    editor: editor,
                    editorState: editorState,
                    events: events,
                    reducerKeys: reducerKeys,
                    rowIndex: index,
                    rowData: cellValues,
                    selectionModel: selectionModel,
                    stateKey: stateKey,
                    store: store
                };

                var key = (0, _getData.getRowKey)(columns, row, i, columns[i].dataIndex);

                return _react2.default.createElement(_Cell.Cell, _extends({
                    key: key
                }, cellProps));
            });

            var isSelected = selectedRows ? selectedRows[id] : false;

            var editClass = editorState && editorState.row && editorState.row.key === id ? selectionModel.defaults.editCls : '';

            var selectedClass = isSelected ? selectionModel.defaults.activeCls : '';

            var rowProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW, selectedClass, editClass),
                onClick: function onClick(e) {
                    handleRowSingleClickEvent(events, row, id, selectionModel, index, e);
                },
                onDoubleClick: function onDoubleClick(e) {
                    handleRowDoubleClickEvent(events, row, id, selectionModel, index, e);
                }
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

            selectionModel.updateCells(cells, id, 'row', reducerKeys, stateKey);

            addEmptyInsert(cells, visibleColumns, plugins);

            return _react2.default.createElement(
                'tr',
                rowProps,
                cells
            );
        }
    }]);

    function Row(props) {
        _classCallCheck(this, Row);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Row).call(this, props));

        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldRowUpdate.bind(_this);
        return _this;
    }

    return Row;
}(_react.Component);

Row.propTypes = {
    columnManager: _react.PropTypes.object.isRequired,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    data: _react.PropTypes.arrayOf(_react.PropTypes.object),
    dataSource: _react.PropTypes.object,
    editor: _react.PropTypes.object,
    editorState: _react.PropTypes.object,
    emptyDataMessage: _react.PropTypes.string,
    events: _react.PropTypes.object,
    index: _react.PropTypes.number,
    menuState: _react.PropTypes.object,
    pageSize: _react.PropTypes.number,
    pager: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    row: _react.PropTypes.object,
    selectedRows: _react.PropTypes.object,
    selectionModel: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object.isRequired
};
Row.defaultProps = {
    emptyDataMessage: 'No Data Available'
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

var getCellData = exports.getCellData = function getCellData(columns, row, key, index, store) {

    var valueAtDataIndex = (0, _getData.getData)(row, columns, index);

    // if a render has been provided, default to this
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

var handleRowDoubleClickEvent = exports.handleRowDoubleClickEvent = function handleRowDoubleClickEvent(events, rowData, rowId, selectionModel, index, reactEvent, id, browserEvent) {
    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.doubleclick && selectionModel.defaults.editEvent !== selectionModel.eventTypes.doubleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index
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

var handleRowSingleClickEvent = exports.handleRowSingleClickEvent = function handleRowSingleClickEvent(events, rowData, rowId, selectionModel, index, reactEvent, id, browserEvent) {

    if (getSelectedText()) {
        return false;
    }

    if (selectionModel && selectionModel.defaults.selectionEvent === selectionModel.eventTypes.singleclick && selectionModel.defaults.editEvent !== selectionModel.eventTypes.singleclick) {

        selectionModel.handleSelectionEvent({
            eventType: reactEvent.type,
            eventData: reactEvent,
            id: rowId,
            index: index
        });
    }

    if (events.HANDLE_ROW_CLICK) {
        events.HANDLE_ROW_CLICK.call(undefined, rowData, rowId, reactEvent, id, browserEvent);
    }
};

exports.default = Row;