'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleColumnClick = exports.handleDrag = exports.addEmptyInsert = undefined;
var _arguments = arguments;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Column = require('./header/Column');

var _EmptyHeader = require('./header/EmptyHeader');

var _DragAndDropManager = require('../core/draganddrop/DragAndDropManager');

var _DragAndDropManager2 = _interopRequireDefault(_DragAndDropManager);

var _prefix = require('../../util/prefix');

var _stateGetter = require('../../util/stateGetter');

var _keyGenerator = require('../../util/keyGenerator');

var _GridConstants = require('../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dragAndDropManager = new _DragAndDropManager2.default();

var Header = function (_Component) {
    _inherits(Header, _Component);

    _createClass(Header, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var columns = _props.columns;
            var columnManager = _props.columnManager;
            var dataSource = _props.dataSource;
            var selectionModel = _props.selectionModel;
            var reducerKeys = _props.reducerKeys;
            var store = _props.store;
            var stateKey = _props.stateKey;
            var pager = _props.pager;
            var plugins = _props.plugins;
            var visible = _props.visible;


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
                    key: 'header-' + i,
                    index: i
                };

                return _react2.default.createElement(_Column.Column, colProps);
            });

            var classes = visible ? (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.HEADER) : (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.HEADER, _GridConstants.CLASS_NAMES.HEADER_HIDDEN);

            var headerProps = {
                className: classes
            };

            if (selectionModel) {
                selectionModel.updateCells(headers, columns, 'header', stateKey);
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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Header).call(this));

        _this.handleDrag = handleDrag;
        return _this;
    }

    return Header;
}(_react.Component);

Header.propTypes = {
    columnManager: _react.PropTypes.object.isRequired,
    columnState: _react.PropTypes.object,
    columns: _react.PropTypes.arrayOf(_react.PropTypes.object).isRequired,
    dataSource: _react.PropTypes.object,
    pager: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    reducerKeys: _react.PropTypes.object,
    selectionModel: _react.PropTypes.object,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object,
    visible: _react.PropTypes.bool
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