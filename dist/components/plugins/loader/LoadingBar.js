'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoadingBar = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('../../../util/prefix');

var _isPluginEnabled = require('../../../util/isPluginEnabled');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadingBar = exports.LoadingBar = function LoadingBar(_ref) {
    var loadingState = _ref.loadingState;
    var plugins = _ref.plugins;


    var isLoading = false;

    if (loadingState && loadingState.isLoading) {
        isLoading = true;
    }

    var showLoader = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'LOADER') && isLoading;

    var loadingBarProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.LOADING_BAR, showLoader ? 'active' : '')
    };

    return _react2.default.createElement('div', loadingBarProps);
};

LoadingBar.propTypes = {
    loadingState: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    store: _react.PropTypes.object
};

LoadingBar.defaultProps = {
    loadingState: {}
};

exports.default = LoadingBar;