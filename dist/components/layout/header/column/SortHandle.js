'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SortHandle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../util/prefix');

var _GridConstants = require('./../../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortHandle = exports.SortHandle = function SortHandle(_ref) {
    var direction = _ref.direction,
        sortHandleCls = _ref.sortHandleCls;


    var handleProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.SORT_HANDLE, direction.toLowerCase(), sortHandleCls)
    };

    return _react2.default.createElement('span', handleProps);
};

SortHandle.propTypes = {
    col: _react.PropTypes.object,
    columnManager: _react.PropTypes.object,
    columns: _react.PropTypes.array,
    dataSource: _react.PropTypes.object,
    direction: _react.PropTypes.string,
    pager: _react.PropTypes.object,
    sortHandleCls: _react.PropTypes.string,
    store: _react.PropTypes.object
};