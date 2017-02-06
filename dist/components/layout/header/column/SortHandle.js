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
    return _react2.default.createElement('span', {
        className: (0, _prefix.prefix)((0, _GridConstants.gridConfig)().CLASS_NAMES.SORT_HANDLE, direction.toLowerCase(), sortHandleCls)
    });
};

var string = _react.PropTypes.string;


SortHandle.propTypes = {
    direction: string,
    sortHandleCls: string
};