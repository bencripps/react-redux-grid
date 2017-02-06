'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPagingSource = exports.getPager = exports.getTotal = exports.getCurrentRecordTotal = exports.getCustomComponent = exports.PagerToolbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Button = require('./toolbar/Button');

var _Description = require('./toolbar/Description');

var _shouldComponentUpdate = require('../../../util/shouldComponentUpdate');

var _prefix = require('../../../util/prefix');

var _isPluginEnabled = require('../../../util/isPluginEnabled');

var _GridConstants = require('../../../constants/GridConstants');

var _getCurrentRecords = require('../../../util/getCurrentRecords');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PagerToolbar = exports.PagerToolbar = function (_Component) {
    _inherits(PagerToolbar, _Component);

    _createClass(PagerToolbar, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                dataSource = _props.dataSource,
                BUTTON_TYPES = _props.BUTTON_TYPES,
                gridData = _props.gridData,
                pageSize = _props.pageSize,
                pagerState = _props.pagerState,
                plugins = _props.plugins,
                recordType = _props.recordType,
                stateKey = _props.stateKey,
                store = _props.store,
                toolbarRenderer = _props.toolbarRenderer;


            var pagerDataSource = getPagingSource(plugins, gridData);

            var _state = this.state,
                stuck = _state.stuck,
                stuckBottom = _state.stuckBottom,
                width = _state.width,
                top = _state.top;


            var customComponent = getCustomComponent(plugins, {
                gridData: gridData,
                pageSize: pageSize,
                pagerState: pagerState,
                plugins: plugins,
                recordType: recordType,
                store: store
            });

            if (customComponent) {
                return customComponent;
            }

            var component = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'PAGER') ? getPager(dataSource, pageSize, recordType, BUTTON_TYPES, pagerState, plugins, gridData, pagerDataSource, toolbarRenderer, stateKey, stuck, stuckBottom, store, top, width) : _react2.default.createElement('div', null);

            return component;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var plugins = this.props.plugins;


            var isSticky = plugins.STICKY_FOOTER ? plugins.STICKY_FOOTER.enabled : false;

            var footerDOM = _reactDom2.default.findDOMNode(this);

            this.FOOTER_HEIGHT = footerDOM.clientHeight;

            if (isSticky && !this._scrollListener) {
                this.createScrollListener(plugins.STICKY_FOOTER, footerDOM);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this._scrollTarget) {
                this._scrollTarget.removeEventListener('scroll', this._scrollListener);
            }

            delete this._scrollListener;
        }
    }]);

    function PagerToolbar(props) {
        _classCallCheck(this, PagerToolbar);

        var _this = _possibleConstructorReturn(this, (PagerToolbar.__proto__ || Object.getPrototypeOf(PagerToolbar)).call(this, props));

        _this.shouldComponentUpdate = _shouldComponentUpdate.shouldPagerUpdate.bind(_this);

        _this.state = {
            stuck: false,
            stuckBottom: false,
            classes: [],
            top: false
        };
        return _this;
    }

    _createClass(PagerToolbar, [{
        key: 'isElementInViewport',
        value: function isElementInViewport(el) {

            var rect = el.getBoundingClientRect();

            return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        }
    }, {
        key: 'shouldStick',
        value: function shouldStick(footerDOM) {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var isTableVisible = this.isElementInViewport(footerDOM.parentNode.querySelector('.' + (0, _prefix.prefix)(CLASS_NAMES.HEADER_FIXED)));

            var isFooterVisible = footerDOM.parentNode.getBoundingClientRect().bottom < window.innerHeight;

            return isTableVisible && !isFooterVisible;
        }
    }, {
        key: 'setWidthResetListener',
        value: function setWidthResetListener(footerDOM) {
            var _this2 = this;

            var scope = this;

            window.addEventListener('resize', function () {
                var _state2 = _this2.state,
                    stuck = _state2.stuck,
                    stuckBottom = _state2.stuckBottom;


                if (stuck || stuckBottom) {
                    scope.setState({
                        width: footerDOM.parentNode.getBoundingClientRect().width
                    });
                }
            });
        }
    }, {
        key: 'createScrollListener',
        value: function createScrollListener(config, footerDOM) {
            var _this3 = this;

            var scope = this;
            var BUFFER = 52;
            var target = config.scrollTarget ? document.querySelector(config.scrollTarget) : document;

            target = target || document;

            this.setWidthResetListener(footerDOM);

            var defaultListener = function defaultListener() {
                var stuck = scope.state.stuck;

                var shouldStick = _this3.shouldStick(footerDOM);
                var shouldStop = footerDOM.parentNode.getBoundingClientRect().top + BUFFER > window.innerHeight;

                if (shouldStop) {
                    return scope.setState({
                        stuckBottom: true,
                        stuck: false,
                        width: null,
                        top: 25
                    });
                }

                if (shouldStick && !stuck) {
                    scope.setState({
                        stuckBottom: false,
                        stuck: true,
                        width: footerDOM.clientWidth,
                        top: null
                    });
                } else if (!shouldStick && stuck) {
                    scope.setState({
                        stuckBottom: false,
                        stuck: false,
                        width: null,
                        top: null
                    });
                }
            };

            this._scrollListener = config.listener ? config.listener.bind(this, {
                footerDOM: footerDOM
            }) : defaultListener;

            this._scrollTarget = target;

            this._scrollTarget.addEventListener('scroll', this._scrollListener);
        }
    }]);

    return PagerToolbar;
}(_react.Component);

PagerToolbar.propTypes = {
    BUTTON_TYPES: _react.PropTypes.object,
    dataSource: _react.PropTypes.any,
    gridData: _react.PropTypes.object,
    nextButtonText: _react.PropTypes.string,
    pageSize: _react.PropTypes.number.isRequired,
    pagerState: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    recordType: _react.PropTypes.string,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object.isRequired,
    toolbarRenderer: _react.PropTypes.func
};
PagerToolbar.defaultProps = {
    recordType: 'Records',
    BUTTON_TYPES: {
        NEXT: 'NEXT',
        BACK: 'BACK'
    },
    toolbarRenderer: function toolbarRenderer(pageIndex, pageSize, total, currentRecords, recordType) {
        if (!currentRecords) {
            return 'No ' + recordType + ' Available';
        }

        return pageIndex * pageSize + '\n                through ' + (pageIndex * pageSize + currentRecords) + '\n                of ' + total + ' ' + recordType + ' Displayed';
    }
};
var getCustomComponent = exports.getCustomComponent = function getCustomComponent(plugins) {
    return plugins && plugins.PAGER && plugins.PAGER.pagerComponent ? plugins.PAGER.pagerComponent : false;
};

var getCurrentRecordTotal = exports.getCurrentRecordTotal = function getCurrentRecordTotal(gridData, pageSize, pageIndex, plugins) {

    if (plugins.PAGER.pagingType === 'remote' && gridData && gridData.currentRecords) {
        return gridData.currentRecords.count();
    } else if (plugins.PAGER.pagingType === 'local') {
        var records = (0, _getCurrentRecords.getCurrentRecords)(gridData, pageIndex, pageSize);
        return records && records.data ? records.data.count() : 0;
    }
};

var getTotal = exports.getTotal = function getTotal(dataSource, pagerDefaults) {

    if (!dataSource || !dataSource.data) {
        return 0;
    }

    if (pagerDefaults && pagerDefaults.pagingType === 'remote') {
        return dataSource.total;
    } else if (pagerDefaults && pagerDefaults.pagingType === 'local') {
        return dataSource.data.count();
    }
};

var getPager = exports.getPager = function getPager(dataSource, pageSize, recordType, BUTTON_TYPES, pager, plugins, gridData, pagerDataSource, toolbarRenderer, stateKey, stuck, stuckBottom, store, top, width) {
    var _gridConfig2 = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig2.CLASS_NAMES;

    var pageIndex = pager && pager.get('pageIndex') ? pager.get('pageIndex') : 0;

    var toolbarProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.PAGERTOOLBAR, stuck ? 'is-stuck' : '', stuckBottom ? 'is-stuck-bottom' : '')
    };

    if (width) {
        toolbarProps.style = {};
        toolbarProps.style.width = width + 'px';
    }

    if (top) {
        toolbarProps.style = toolbarProps.style || {};
        toolbarProps.style.top = top + 'px';
    }

    var currentRecords = getCurrentRecordTotal(gridData, pageSize, pageIndex, plugins, gridData);

    var total = getTotal(gridData, plugins.PAGER);

    var descriptionProps = {
        pageIndex: pageIndex,
        pageSize: pageSize,
        total: total,
        currentRecords: currentRecords,
        recordType: recordType
    };

    var spacerProps = {
        style: {
            height: '33px'
        }
    };

    var spacer = stuck || stuckBottom ? _react2.default.createElement('div', spacerProps) : null;

    return _react2.default.createElement(
        'div',
        null,
        spacer,
        _react2.default.createElement(
            'div',
            toolbarProps,
            _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_Button.Button, {
                    dataSource: dataSource,
                    BUTTON_TYPES: BUTTON_TYPES,
                    type: BUTTON_TYPES.BACK,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    plugins: plugins,
                    currentRecords: currentRecords,
                    total: total,
                    gridData: gridData,
                    stateKey: stateKey,
                    store: store }),
                _react2.default.createElement(_Button.Button, {
                    dataSource: dataSource,
                    BUTTON_TYPES: BUTTON_TYPES,
                    type: BUTTON_TYPES.NEXT,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    plugins: plugins,
                    currentRecords: currentRecords,
                    total: total,
                    gridData: gridData,
                    stateKey: stateKey,
                    store: store })
            ),
            _react2.default.createElement(_Description.Description, descriptionProps)
        )
    );
};

var getPagingSource = exports.getPagingSource = function getPagingSource(plugins, gridData) {
    if (plugins && plugins.PAGER && plugins.PAGER.pagingSource) {
        return plugins.PAGER.pagingSource;
    }

    return gridData;
};

exports.default = PagerToolbar;