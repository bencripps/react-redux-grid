'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyHeader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyHeader = exports.EmptyHeader = function EmptyHeader(props) {

    var headerProps = _extends({
        style: {
            width: '100%'
        },
        key: 'react-grid-empty-header'
    }, props);

    return _react2.default.createElement('th', headerProps);
};

EmptyHeader.propTypes = {
    props: _react.PropTypes.object
};