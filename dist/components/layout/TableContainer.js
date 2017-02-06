'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TableContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _GridConstants = require('./../../constants/GridConstants');

var _prefix = require('./../../util/prefix');

var _throttle = require('./../../util/throttle');

var _TableRow = require('./TableRow');

var _TableRow2 = _interopRequireDefault(_TableRow);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var any = _react.PropTypes.any,
    bool = _react.PropTypes.bool,
    number = _react.PropTypes.number,
    object = _react.PropTypes.object,
    oneOfType = _react.PropTypes.oneOfType,
    string = _react.PropTypes.string;

var TableContainer = exports.TableContainer = function (_Component) {
    _inherits(TableContainer, _Component);

    _createClass(TableContainer, [{
        key: 'render',
        value: function render() {
            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                editorComponent = _props.editorComponent,
                headerProps = _props.headerProps,
                height = _props.height,
                rowProps = _props.rowProps,
                infinite = _props.infinite;
            var _state = this.state,
                containerScrollTop = _state.containerScrollTop,
                containerHeight = _state.containerHeight;


            return _react2.default.createElement(
                'div',
                {
                    className: (0, _prefix.prefix)(CLASS_NAMES.TABLE_CONTAINER),
                    style: { height: height }
                },
                _react2.default.createElement(
                    'table',
                    {
                        cellSpacing: 0,
                        className: (0, _prefix.prefix)(CLASS_NAMES.TABLE, CLASS_NAMES.HEADER_HIDDEN)
                    },
                    _react2.default.createElement(_Header2.default, headerProps),
                    _react2.default.createElement(_TableRow2.default, Object.assign({
                        containerHeight: containerHeight,
                        containerScrollTop: containerScrollTop,
                        infinite: infinite
                    }, rowProps))
                ),
                editorComponent
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var infinite = this.props.infinite;


            if (infinite) {
                var container = _reactDom2.default.findDOMNode(this);

                this._scrollListener = (0, _throttle.throttle)(this.handleScroll.bind(this), this, 50, { leading: false, trailing: true });

                container.addEventListener('scroll', this._scrollListener);

                this._resizeListener = (0, _throttle.debounce)(this.handleResize.bind(this), 5);

                window.addEventListener('resize', this._resizeListener);

                this.handleResize();
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.handleResize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var container = _reactDom2.default.findDOMNode(this);

            container.removeEventListener('scroll', this._scrollListener);
            window.removeEventListener('resize', this._resizeListener);
        }
    }]);

    function TableContainer(props) {
        _classCallCheck(this, TableContainer);

        var _this = _possibleConstructorReturn(this, (TableContainer.__proto__ || Object.getPrototypeOf(TableContainer)).call(this, props));

        _this.handleResize = function () {
            var infinite = _this.props.infinite;
            var containerHeight = _this.state.containerHeight;


            if (infinite) {
                var container = _reactDom2.default.findDOMNode(_this);

                if (containerHeight !== container.clientHeight) {
                    _this.setState({
                        containerHeight: container.clientHeight
                    });
                }
            }
        };

        _this.handleScroll = function () {
            var container = _reactDom2.default.findDOMNode(_this);

            _this.setState({
                containerScrollTop: container.scrollTop
            });
        };

        _this.state = {
            containerScrollTop: 0
        };
        return _this;
    }

    return TableContainer;
}(_react.Component);

TableContainer.propTypes = {
    editorComponent: any,
    headerProps: object,
    height: oneOfType([string, number]),
    infinite: bool,
    rowProps: object
};
TableContainer.defaultProps = {
    headerProps: {},
    rowProps: {}
};
exports.default = TableContainer;