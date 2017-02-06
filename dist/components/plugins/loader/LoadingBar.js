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
    var isLoading = _ref.isLoading,
        plugins = _ref.plugins;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var showLoader = (0, _isPluginEnabled.isPluginEnabled)(plugins, 'LOADER') && isLoading;

    return _react2.default.createElement('div', {
        className: (0, _prefix.prefix)(CLASS_NAMES.LOADING_BAR, showLoader ? 'active' : '')
    });
};

var bool = _react.PropTypes.bool,
    object = _react.PropTypes.object;


LoadingBar.propTypes = {
    isLoading: bool,
    plugins: object
};

LoadingBar.defaultProps = {
    isLoading: false
};

exports.default = LoadingBar;