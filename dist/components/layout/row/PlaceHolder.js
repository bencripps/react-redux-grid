'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlaceHolder = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('../../../util/prefix');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlaceHolder = exports.PlaceHolder = function PlaceHolder(message) {

    var rowProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW)
    };

    var tdProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW, _GridConstants.CLASS_NAMES.EMPTY_ROW)
    };

    return _react2.default.createElement(
        'tr',
        rowProps,
        _react2.default.createElement(
            'td',
            _extends({ colSpan: '100%' }, tdProps),
            message.emptyDataMessage
        )
    );
};

PlaceHolder.propTypes = {
    message: _react.PropTypes.object
};

_react.PropTypes.defaultProps = {
    message: {
        emptyDataMessage: ''
    }
};