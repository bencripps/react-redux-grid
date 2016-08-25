'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedMenu = exports.Menu = exports.getUniqueItems = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _MenuItem = require('./MenuItem');

var _keyGenerator = require('../../../util/keyGenerator');

var _prefix = require('../../../util/prefix');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var array = _react.PropTypes.array;
var number = _react.PropTypes.number;
var object = _react.PropTypes.object;
var string = _react.PropTypes.string;

var Menu = function (_Component) {
    _inherits(Menu, _Component);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Menu).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var menu = _props.menu;
            var maxHeight = _props.maxHeight;


            var menuProps = {
                className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.GRID_ACTIONS.MENU.CONTAINER),
                style: {}
            };

            if (maxHeight !== undefined) {
                // to compensate for 10px padding on top and bottom
                // of menu
                // we adjust max height
                menuProps.style.maxHeight = maxHeight - 20;
            }

            var items = getUniqueItems(menu);

            var menuItems = items && items.length > 0 ? items.map(this.getMenuItem.bind(this)) : null;

            return _react2.default.createElement(
                'ul',
                menuProps,
                menuItems
            );
        }
    }, {
        key: 'getMenuItem',
        value: function getMenuItem(item) {
            var _props2 = this.props;
            var metaData = _props2.metaData;
            var stateKey = _props2.stateKey;
            var store = _props2.store;


            if (!item.$$typeof) {
                var menuItemProps = {
                    data: item,
                    disabled: item.disabled,
                    metaData: metaData,
                    type: item.type,
                    key: (0, _keyGenerator.keyFromObject)(item),
                    stateKey: stateKey,
                    store: store
                };

                return _react2.default.createElement(_MenuItem.MenuItem, menuItemProps);
            }
            return item;
        }
    }]);

    return Menu;
}(_react.Component);

Menu.propTypes = {
    maxHeight: number,
    menu: array,
    metaData: object,
    stateKey: string,
    store: object
};
Menu.defaultProps = {
    metaData: {}
};
var getUniqueItems = exports.getUniqueItems = function getUniqueItems(items) {
    var keys = items.map(function (obj) {
        return obj.key;
    });
    var unique = items.filter(function (ob, i) {
        return keys.indexOf(ob.key) === i;
    });
    return unique;
};

function mapStateToProps() {
    return {};
}

var ConnectedMenu = (0, _reactRedux.connect)(mapStateToProps)(Menu);

exports.Menu = Menu;
exports.ConnectedMenu = ConnectedMenu;