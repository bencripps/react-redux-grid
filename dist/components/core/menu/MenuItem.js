'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConnectedMenuItem = exports.MenuItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('../../../util/prefix');

var _emptyFn = require('../../../util/emptyFn');

var _GridConstants = require('../../../constants/GridConstants');

var _MenuActions = require('../../../actions/plugins/actioncolumn/MenuActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuItem = function (_Component) {
    _inherits(MenuItem, _Component);

    function MenuItem() {
        _classCallCheck(this, MenuItem);

        return _possibleConstructorReturn(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).apply(this, arguments));
    }

    _createClass(MenuItem, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _gridConfig = (0, _GridConstants.gridConfig)(),
                CLASS_NAMES = _gridConfig.CLASS_NAMES;

            var _props = this.props,
                data = _props.data,
                disabled = _props.disabled,
                metaData = _props.metaData,
                menuItemsTypes = _props.menuItemsTypes,
                stateKey = _props.stateKey;


            var menuItemProps = {
                className: (0, _prefix.prefix)(CLASS_NAMES.GRID_ACTIONS.MENU.ITEM, data.disabled ? CLASS_NAMES.GRID_ACTIONS.DISABLED : ''),
                disabled: data.disabled,
                onClick: function onClick(e) {
                    return _this2.handleMenuItemClick(data, disabled, metaData, stateKey, e);
                }
            };

            var checkboxComponent = data.menuItemType === menuItemsTypes.checkbox ? this.getCheckbox(data) : null;

            return _react2.default.createElement(
                'li',
                menuItemProps,
                checkboxComponent,
                data.text
            );
        }
    }, {
        key: 'handleMenuItemClick',
        value: function handleMenuItemClick(data, disabled, metaData, stateKey, reactEvent) {
            if (reactEvent && reactEvent.stopPropagation) {
                reactEvent.stopPropagation();
            }

            if (disabled) {
                return false;
            }

            var dismiss = data.dismissOnClick !== undefined ? data.dismissOnClick : true;

            var store = this.props.store;


            if (dismiss) {
                store.dispatch((0, _MenuActions.hideMenu)({ stateKey: stateKey }));
            }

            if (data.EVENT_HANDLER) {
                return data.EVENT_HANDLER({ data: data, metaData: metaData, reactEvent: reactEvent });
            }
        }
    }, {
        key: 'getCheckbox',
        value: function getCheckbox(data) {

            var readOnly = data.hideable !== undefined ? !data.hideable : false;

            var checkboxProps = {
                type: this.props.menuItemsTypes.checkbox,
                checked: data.checked,
                disabled: readOnly,
                onChange: data.onCheckboxChange || _emptyFn.emptyFn
            };

            return _react2.default.createElement('input', checkboxProps);
        }
    }]);

    return MenuItem;
}(_react.Component);

MenuItem.propTypes = {
    data: _react2.default.PropTypes.object,
    disabled: _react2.default.PropTypes.bool,
    menuItemsTypes: _react2.default.PropTypes.object,
    metaData: _react2.default.PropTypes.object,
    stateKey: _react2.default.PropTypes.string,
    store: _react2.default.PropTypes.object
};
MenuItem.defaultProps = {
    menuItemsTypes: {
        checkbox: 'checkbox'
    },
    metaData: {}
};


var ConnectedMenuItem = MenuItem;

exports.MenuItem = MenuItem;
exports.ConnectedMenuItem = ConnectedMenuItem;