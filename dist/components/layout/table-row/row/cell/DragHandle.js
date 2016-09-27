'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragHandle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../../util/prefix');

var _GridConstants = require('./../../../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = exports.DragHandle = function DragHandle(_ref) {
    var store = _ref.store;


    var handleProps = {
        className: (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.ROW_DRAG_HANDLE),
        onClick: function onClick() {
            console.log('Travis add func');
        }
    };

    return _react2.default.createElement('span', handleProps);
};

var object = _react.PropTypes.object;


DragHandle.propTypes = {
    store: object
};

DragHandle.defaultProps = {};

exports.default = DragHandle;