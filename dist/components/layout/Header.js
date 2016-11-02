'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleColumnClick = exports.handleDrag = exports.addEmptyInsert = undefined;
var _arguments = arguments;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Column = require('./header/Column');

var _EmptyHeader = require('./header/EmptyHeader');

var _DragAndDropManager = require('../core/draganddrop/DragAndDropManager');

var _DragAndDropManager2 = _interopRequireDefault(_DragAndDropManager);

var _prefix = require('../../util/prefix');

var _shouldComponentUpdate = require('../../util/shouldComponentUpdate');

var _keyGenerator = require('../../util/keyGenerator');

var _GridConstants = require('../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;


var dragAndDropManager = new _DragAndDropManager2.default();

var Header = function (_Component) {
    _inherits(Header, _Component);

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                columns = _props.columns,
                columnManager = _props.columnManager,
                dataSource = _props.dataSource,
                selectionModel = _props.selectionModel,
                reducerKeys = _props.reducerKeys,
                store = _props.store,
                stateKey = _props.stateKey,
                pager = _props.pager,
                plugins = _props.plugins,
                visible = _props.visible;


            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });
            var headers = visibleColumns.map(function (col, i) {

                var colProps = {
                    scope: _this2,
                    col: col,
                    columns: columns,
                    visibleColumns: visibleColumns,
                    columnManager: columnManager,
                    dataSource: dataSource,
                    dragAndDropManager: dragAndDropManager,
                    pager: pager,
                    store: store,
                    index: i
                };

                return _react2.default.createElement(_Column.Column, _extends({
                    key: 'header-' + i
                }, colProps));
            });

            var classes = visible ? (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.HEADER) : (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.HEADER, _GridConstants.CLASS_NAMES.HEADER_HIDDEN);

            var headerProps = {
                className: classes
            };

            if (selectionModel) {
                selectionModel.updateCells({
                    cells: headers,
                    rowId: 'header',
                    type: 'header',
                    index: 0,
                    reducerKeys: reducerKeys,
                    stateKey: stateKey,
                    rowData: {},
                    isSelected: null
                });
            }

            columnManager.addActionColumn({
                cells: headers,
                type: 'header',
                id: (0, _keyGenerator.keyFromObject)(headers),
                reducerKeys: reducerKeys,
                stateKey: stateKey
            });

            addEmptyInsert(headers, visibleColumns, plugins);

            return _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    headerProps,
                    headers
                )
            );
        }
    }]);

    function Header() {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

        _this.handleDrag = handleDrag;
        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldHeaderUpdate.bind(_this);
        return _this;
    }

    return Header;
}(_react.Component);

Header.propTypes = {
    columnManager: object.isRequired,
    columnState: object,
    columns: arrayOf(object).isRequired,
    dataSource: object,
    pager: object,
    plugins: object,
    reducerKeys: object,
    selectionModel: object,
    stateKey: string,
    store: object,
    visible: bool
};
var addEmptyInsert = exports.addEmptyInsert = function addEmptyInsert(headers, visibleColumns, plugins) {

    if (!plugins) {
        return false;
    }

    var GRID_ACTIONS = plugins.GRID_ACTIONS;


    if (visibleColumns.length === 0) {

        if (GRID_ACTIONS && GRID_ACTIONS.menu && GRID_ACTIONS.menu.length > 0) {

            headers.splice(1, 0, _react2.default.createElement(_EmptyHeader.EmptyHeader, { key: 'empty-header' }));
        } else {
            headers.push(_react2.default.createElement(_EmptyHeader.EmptyHeader, { key: 'empty-header' }));
        }
    }
};

var handleDrag = exports.handleDrag = function handleDrag() {
    return false;
};

var handleColumnClick = exports.handleColumnClick = function handleColumnClick(col) {
    if (col.HANDLE_CLICK) {
        col.HANDLE_CLICK.apply(undefined, _arguments);
    }
};

exports.default = Header;