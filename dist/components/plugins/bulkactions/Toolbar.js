'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAction = exports.getToolbar = exports.getTotalSelection = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prefix = require('../../../util/prefix');

var _stateGetter = require('../../../util/stateGetter');

var _keyGenerator = require('../../../util/keyGenerator');

var _isPluginEnabled = require('../../../util/isPluginEnabled');

var _GridConstants = require('../../../constants/GridConstants');

var _ToolbarActions = require('../../../actions/plugins/bulkactions/ToolbarActions');

var _ModelActions = require('../../../actions/plugins/selection/ModelActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulkActionToolbar = function (_Component) {
    _inherits(BulkActionToolbar, _Component);

    _createClass(BulkActionToolbar, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var bulkActionState = _props.bulkActionState;
            var selectedRows = _props.selectedRows;
            var plugins = _props.plugins;


            var toolbar = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'BULK_ACTIONS') && plugins.BULK_ACTIONS.actions && plugins.BULK_ACTIONS.actions.length > 0 ? getToolbar(plugins.BULK_ACTIONS.actions, bulkActionState, selectedRows) : _react2.default.createElement('div', null);

            return toolbar;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var _props2 = this.props;
            var store = _props2.store;
            var stateKey = _props2.stateKey;
            var bulkActionState = _props2.bulkActionState;
            var selectedRows = _props2.selectedRows;

            var isRemoved = bulkActionState && bulkActionState.isRemoved;
            var totalCount = getTotalSelection(selectedRows);

            if (bulkActionState) {
                if (totalCount === 0 && !isRemoved) {
                    clearTimeout(this.removeTimeout);
                    this.removeTimeout = setTimeout(function () {
                        store.dispatch((0, _ToolbarActions.removeToolbar)({ state: true, stateKey: stateKey }));
                    }, 300);
                } else if (totalCount > 0 && isRemoved) {
                    store.dispatch((0, _ToolbarActions.removeToolbar)({ state: false, stateKey: stateKey }));
                }
            }
        }
    }]);

    function BulkActionToolbar() {
        _classCallCheck(this, BulkActionToolbar);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BulkActionToolbar).call(this));

        _this.removeTimeout = null;
        return _this;
    }

    _createClass(BulkActionToolbar, [{
        key: 'handleChange',
        value: function handleChange(reactEvent) {
            var _props3 = this.props;
            var stateKey = _props3.stateKey;
            var store = _props3.store;
            var dataSource = _props3.dataSource;


            if (reactEvent.target && reactEvent.target.checked) {
                store.dispatch((0, _ModelActions.selectAll)({ data: dataSource, stateKey: stateKey }));
            } else {
                store.dispatch((0, _ModelActions.deselectAll)({ stateKey: stateKey }));
            }
        }
    }]);

    return BulkActionToolbar;
}(_react.Component);

BulkActionToolbar.propTypes = {
    bulkActionState: _react.PropTypes.object,
    dataSource: _react.PropTypes.object,
    plugins: _react.PropTypes.object.isRequired,
    selectedRows: _react.PropTypes.object,
    selectionModel: _react.PropTypes.object.isRequired,
    stateKey: _react.PropTypes.string,
    store: _react.PropTypes.object.isRequired
};
var getTotalSelection = exports.getTotalSelection = function getTotalSelection(selectedRows) {
    var count = selectedRows && Object.keys(selectedRows).length ? Object.keys(selectedRows).filter(function (k) {
        return selectedRows[k] && k !== 'lastUpdate' && k !== 'indexes';
    }).length : 0;

    return count;
};

var getToolbar = exports.getToolbar = function getToolbar(actions, bulkActionState, selectedRows) {
    var totalCount = getTotalSelection(selectedRows);

    var shownCls = totalCount > 0 ? _GridConstants.CLASS_NAMES.BULK_ACTIONS.SHOWN : _GridConstants.CLASS_NAMES.BULK_ACTIONS.HIDDEN;

    var removedCls = bulkActionState && bulkActionState.isRemoved ? 'removed' : null;

    var containerProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.BULK_ACTIONS.CONTAINER, shownCls, removedCls)
    };

    var spanProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.BULK_ACTIONS.DESCRIPTION),
        text: totalCount + ' Selected'
    };

    var buttons = actions.map(getAction);

    return _react2.default.createElement(
        'div',
        containerProps,
        _react2.default.createElement(
            'span',
            spanProps,
            spanProps.text
        ),
        buttons
    );
};

var getAction = exports.getAction = function getAction(action) {

    var buttonProps = {
        text: action.text,
        onClick: action.EVENT_HANDLER,
        key: (0, _keyGenerator.keyFromObject)(action)
    };

    return _react2.default.createElement(
        'button',
        buttonProps,
        buttonProps.text
    );
};

function mapStateToProps(state, props) {

    return {
        dataSource: (0, _stateGetter.stateGetter)(state, props, 'dataSource', props.stateKey),
        selectedRows: (0, _stateGetter.stateGetter)(state, props, 'selection', props.stateKey),
        bulkActionState: (0, _stateGetter.stateGetter)(state, props, 'bulkaction', props.stateKey)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(BulkActionToolbar);