'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleDrag = exports.addEmptyInsert = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Column = require('./header/Column');

var _EmptyHeader = require('./header/EmptyHeader');

var _DragAndDropManager = require('../core/draganddrop/DragAndDropManager');

var _DragAndDropManager2 = _interopRequireDefault(_DragAndDropManager);

var _shouldComponentUpdate = require('../../util/shouldComponentUpdate');

var _prefix = require('../../util/prefix');

var _throttle = require('../../util/throttle');

var _isPluginEnabled = require('../../util/isPluginEnabled');

var _GridConstants = require('../../constants/GridConstants');

var _GridActions = require('../../actions/GridActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var arrayOf = _react.PropTypes.arrayOf,
    bool = _react.PropTypes.bool,
    object = _react.PropTypes.object,
    string = _react.PropTypes.string;


var dragAndDropManager = new _DragAndDropManager2.default();

var FixedHeader = function (_Component) {
    _inherits(FixedHeader, _Component);

    _createClass(FixedHeader, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                columns = _props.columns,
                columnManager = _props.columnManager,
                dataSource = _props.dataSource,
                headerHidden = _props.headerHidden,
                reducerKeys = _props.reducerKeys,
                selectionModel = _props.selectionModel,
                stateKey = _props.stateKey,
                stateful = _props.stateful,
                store = _props.store,
                pager = _props.pager,
                plugins = _props.plugins,
                menuState = _props.menuState;
            var _state = this.state,
                bottom = _state.bottom,
                classes = _state.classes,
                headerOffset = _state.headerOffset,
                stuck = _state.stuck,
                stuckToBottom = _state.stuckToBottom,
                width = _state.width;


            var visibleColumns = columns.filter(function (col) {
                return !col.hidden;
            });
            var headers = visibleColumns.map(function (col, i) {
                return _react2.default.createElement(_Column.Column, {
                    actualIndex: columns.findIndex(function (c) {
                        return col.dataIndex === c.dataIndex;
                    }),
                    col: col,
                    columnManager: columnManager,
                    columns: columns,
                    dataSource: dataSource,
                    dragAndDropManager: dragAndDropManager,
                    index: i,
                    key: 'fixed-header-' + i,
                    pager: pager,
                    scope: _this2,
                    stateKey: stateKey,
                    stateful: stateful,
                    store: store,
                    visibleColumns: visibleColumns
                });
            });

            var tableStyle = {};
            var tableClassName = (0, _prefix.prefix)(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_FIXED, stuck ? CLASS_NAMES.HEADER_STUCK : '', stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : '');

            if (classes.length > 0) {
                classes.forEach(function (cls) {
                    tableClassName += ' ' + cls;
                });
            } else {
                tableClassName = (0, _prefix.prefix)(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_FIXED, stuck ? CLASS_NAMES.HEADER_STUCK : '', stuckToBottom ? CLASS_NAMES.HEADER_STUCK_BOTTOM : '');
            }

            var fillerCmp = stuck || stuckToBottom ? _react2.default.createElement('div', {
                style: { height: (this.HEADER_HEIGHT || 25) + 'px' }
            }) : null;

            if (stuck || stuckToBottom) {
                tableStyle.width = width + 'px';
                tableStyle.bottom = bottom + 'px';
            }

            var theadClassName = (0, _prefix.prefix)(CLASS_NAMES.THEADER, headerOffset > 0 ? 'adjusted' : '');

            if (selectionModel) {
                selectionModel.updateCells({
                    cells: headers,
                    rowId: 'fixedHeader',
                    type: 'header',
                    index: 0,
                    reducerKeys: reducerKeys,
                    stateKey: stateKey,
                    rowData: {},
                    isSelected: null
                });
            }

            columnManager.addActionColumn({
                columns: columns,
                cells: headers,
                type: 'header',
                id: 'header-row',
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                stateful: stateful,
                menuState: menuState
            });

            addEmptyInsert(headers, visibleColumns, plugins, headerOffset);

            var containerClassName = (0, _prefix.prefix)(CLASS_NAMES.HEADER_FIXED_CONTAINER, headerHidden ? 'hidden' : '');

            return _react2.default.createElement(
                'div',
                { className: containerClassName },
                fillerCmp,
                _react2.default.createElement(
                    'table',
                    {
                        cellSpacing: 0,
                        className: tableClassName,
                        style: tableStyle
                    },
                    _react2.default.createElement(
                        'thead',
                        { className: theadClassName },
                        _react2.default.createElement(
                            'tr',
                            { className: (0, _prefix.prefix)(CLASS_NAMES.HEADER) },
                            headers
                        )
                    ),
                    _react2.default.createElement('tbody', null)
                )
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var plugins = this.props.plugins;


            var isSticky = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'STICKY_HEADER');

            var headerDOM = _reactDom2.default.findDOMNode(this);
            var tableHeight = headerDOM.parentNode.clientHeight;

            this.HEADER_HEIGHT = headerDOM.clientHeight;

            if (isSticky && !this._scrollListener) {
                this.createScrollListener(plugins.STICKY_HEADER, headerDOM, tableHeight);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {

            if (!this.updateFunc) {
                this.updateFunc = (0, _throttle.debounce)(this.getScrollWidth, 200);
            }

            this.updateFunc();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollTarget) {
                this.scrollTarget.removeEventListener('scroll', this._scrollListener);
            }

            if (this._scrollListener) {
                delete this._scrollListener;
            }
        }
    }]);

    function FixedHeader() {
        _classCallCheck(this, FixedHeader);

        var _this = _possibleConstructorReturn(this, (FixedHeader.__proto__ || Object.getPrototypeOf(FixedHeader)).call(this));

        _this.state = {
            stuck: false,
            headerOffset: 0,
            classes: []
        };
        _this.handleDrag = (0, _throttle.throttle)(handleDrag, _this, 5);
        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldHeaderUpdate.bind(_this);
        return _this;
    }

    _createClass(FixedHeader, [{
        key: 'setWidthResetListener',
        value: function setWidthResetListener(headerDOM) {
            var _this3 = this;

            var scope = this;

            window.addEventListener('resize', function () {
                var _state2 = _this3.state,
                    stuck = _state2.stuck,
                    stuckToBottom = _state2.stuckToBottom;


                if (stuck || stuckToBottom) {
                    scope.setState({
                        width: headerDOM.parentNode.getBoundingClientRect().width
                    });
                }
            });
        }
    }, {
        key: 'createScrollListener',
        value: function createScrollListener(config, headerDOM) {

            var scope = this;
            var target = config.scrollTarget ? document.querySelector(config.scrollTarget) : document;

            target = target || document;

            this.setWidthResetListener(headerDOM);

            var defaultListener = function defaultListener() {
                var _scope$state = scope.state,
                    stuck = _scope$state.stuck,
                    stuckToBottom = _scope$state.stuckToBottom;

                var _headerDOM$getBoundin = headerDOM.getBoundingClientRect(),
                    top = _headerDOM$getBoundin.top;

                var tableHeight = headerDOM.parentNode.clientHeight;
                var shouldStop = top + tableHeight - headerDOM.clientHeight * 2;

                if (shouldStop < 0 && stuckToBottom) {
                    return false;
                }

                if (stuck && shouldStop < 0) {
                    return scope.setState({
                        stuck: false,
                        stuckToBottom: true,
                        width: headerDOM.clientWidth,
                        bottom: headerDOM.clientHeight
                    });
                }

                if (top < 0 && !stuck) {
                    return scope.setState({
                        stuck: true,
                        stuckToBottom: false,
                        width: headerDOM.clientWidth
                    });
                } else if (top > 0 && stuck) {
                    return scope.setState({
                        stuck: false,
                        stuckToBottom: false,
                        width: null
                    });
                }

                if (stuck && shouldStop < 0) {
                    return scope.setState({
                        stuck: false,
                        stuckToBottom: false,
                        width: null
                    });
                }
            };

            this._scrollListener = config.listener ? config.listener.bind(this, {
                headerDOM: headerDOM
            }) : defaultListener;

            this.scrollTarget = target;

            this.scrollTarget.addEventListener('scroll', this._scrollListener);
        }
    }, {
        key: 'getScrollWidth',
        value: function getScrollWidth() {
            var _gridConfig2 = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig2.CLASS_NAMES;

            var header = _reactDom2.default.findDOMNode(this);
            var headerOffset = this.state.headerOffset;


            var fixed = header.querySelector('.' + (0, _prefix.prefix)(CLASS_NAMES.HEADER_FIXED));
            var hidden = header.parentNode.querySelector('.' + (0, _prefix.prefix)(CLASS_NAMES.HEADER_HIDDEN));

            if (!fixed || !hidden) {
                return;
            }

            var offset = fixed.offsetWidth - hidden.offsetWidth;

            if (offset !== undefined && offset !== headerOffset) {
                /* eslint-disable react/no-set-state */
                this.setState({
                    headerOffset: offset
                });
                /* eslint-enable react/no-set-state */
            }
        }
    }]);

    return FixedHeader;
}(_react.Component);

FixedHeader.propTypes = {
    columnManager: object.isRequired,
    columns: arrayOf(object).isRequired,
    dataSource: object,
    headerHidden: bool,
    menuState: object,
    pager: object,
    plugins: object,
    reducerKeys: object,
    selectionModel: object,
    stateKey: string,
    stateful: bool,
    store: object
};
var addEmptyInsert = exports.addEmptyInsert = function addEmptyInsert(headers, visibleColumns, plugins, headerOffset) {
    if (!plugins) {
        return false;
    }

    var GRID_ACTIONS = plugins.GRID_ACTIONS;


    if (visibleColumns.length === 0) {

        if (GRID_ACTIONS && GRID_ACTIONS.menu && GRID_ACTIONS.menu.length > 0) {

            headers.unshift(_react2.default.createElement(_EmptyHeader.EmptyHeader, { key: 'empty-header' }));
        } else {
            headers.push(_react2.default.createElement(_EmptyHeader.EmptyHeader, { key: 'empty-header' }));
        }
    }

    if (headerOffset !== undefined) {
        headers.push(_react2.default.createElement('th', {
            key: 'colum-adjuster',
            style: { width: headerOffset + 'px' }
        }));
    }
};

var handleDrag = exports.handleDrag = function handleDrag(scope, columns, id, columnManager, store, nextColumnKey, stateKey, stateful, reactEvent) {

    var header = reactEvent.target.parentElement.parentElement;
    var columnNode = reactEvent.target.parentElement;
    var headerNextElementSibling = columnNode.nextElementSibling;
    var columnOffsetLeft = columnNode.getBoundingClientRect().left;
    var headerWidth = parseFloat(window.getComputedStyle(header).width, 10);

    var xCoord = reactEvent.clientX || window.reactGridXcoord;
    var computedWidth = (xCoord - columnOffsetLeft) / headerWidth;
    var totalWidth = parseFloat(columnNode.style.width, 10) + parseFloat(headerNextElementSibling.style.width, 10);

    var width = computedWidth * 100;
    var nextColWidth = Math.abs(width - totalWidth);

    var isInvalidDrag = width + nextColWidth > totalWidth;

    if (nextColWidth < 0 || width < 0) {
        return false;
    }

    if (nextColWidth < columnManager.config.minColumnWidth) {
        nextColWidth = columnManager.config.minColumnWidth;
        width = totalWidth - columnManager.config.minColumnWidth;
    } else if (width < columnManager.config.minColumnWidth) {
        width = columnManager.config.minColumnWidth;
        nextColWidth = totalWidth - columnManager.config.minColumnWidth;
    } else if (isInvalidDrag) {
        return false;
    }

    store.dispatch((0, _GridActions.resizeColumns)({
        width: width,
        id: id,
        nextColumn: {
            id: nextColumnKey,
            width: nextColWidth
        },
        columns: columns,
        stateKey: stateKey,
        stateful: stateful
    }));
};

exports.default = FixedHeader;