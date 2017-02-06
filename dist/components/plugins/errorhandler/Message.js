'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMessage = exports.handleButtonClick = exports.Message = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _prefix = require('../../../util/prefix');

var _stateGetter = require('../../../util/stateGetter');

var _GridConstants = require('../../../constants/GridConstants');

var _ErrorHandlerActions = require('../../../actions/plugins/errorhandler/ErrorHandlerActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Message = exports.Message = function Message(_ref) {
    var errorHandler = _ref.errorHandler,
        plugins = _ref.plugins,
        store = _ref.store;


    var defaultMessage = plugins && plugins.ERROR_HANDLER && plugins.ERROR_HANDLER.defaultErrorMessage ? plugins.ERROR_HANDLER.defaultErrorMessage : 'An Error Occurred';

    var showError = errorHandler && errorHandler.errorOccurred;

    var message = errorHandler && errorHandler.error ? errorHandler.error : defaultMessage;

    var errorMessage = getMessage(message, showError, store);

    return errorMessage;
};

var handleButtonClick = exports.handleButtonClick = function handleButtonClick(store) {
    store.dispatch((0, _ErrorHandlerActions.dismissError)());
};

var getMessage = exports.getMessage = function getMessage(message, isShown, store) {
    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var messageContainerProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.ERROR_HANDLER.CONTAINER, isShown ? 'shown' : null)
    };

    var messageProps = {
        className: (0, _prefix.prefix)(CLASS_NAMES.ERROR_HANDLER.MESSAGE)
    };

    var buttonProps = {
        onClick: handleButtonClick.bind(undefined, store)
    };

    return _react2.default.createElement(
        'div',
        messageContainerProps,
        _react2.default.createElement(
            'span',
            messageProps,
            message
        ),
        _react2.default.createElement(
            'button',
            buttonProps,
            'Close'
        )
    );
};

Message.propTypes = {
    errorHandler: _react.PropTypes.object,
    plugins: _react.PropTypes.object,
    store: _react.PropTypes.object
};

Message.defaultProps = {};

function mapStateToProps(state, props) {
    return {
        errorHandler: (0, _stateGetter.stateGetter)(state, props, 'errorhandler', 'errorState')
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Message);