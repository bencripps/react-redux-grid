'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyCell = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Cell = require('./Cell');

var _Cell2 = _interopRequireDefault(_Cell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyCell = exports.EmptyCell = function EmptyCell(props) {

    var cellProps = _extends({
        style: {
            width: '100%'
        }
    }, props);

    return _react2.default.createElement(_Cell2.default, cellProps);
};