'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PlaceHolder = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('../../../util/prefix');

var _GridConstants = require('../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PlaceHolder = exports.PlaceHolder = function PlaceHolder(message) {
    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    return _react2.default.createElement(
        'tr',
        {
            className: (0, _prefix.prefix)(CLASS_NAMES.ROW)
        },
        _react2.default.createElement(
            'td',
            {
                className: (0, _prefix.prefix)(CLASS_NAMES.ROW, CLASS_NAMES.EMPTY_ROW),
                colSpan: '100%'
            },
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