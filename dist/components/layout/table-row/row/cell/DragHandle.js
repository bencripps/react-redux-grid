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

var DragHandle = exports.DragHandle = function DragHandle() {
    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    return _react2.default.createElement('span', {
        className: (0, _prefix.prefix)(CLASS_NAMES.ROW_DRAG_HANDLE)
    });
};

var object = _react.PropTypes.object;


DragHandle.propTypes = {
    store: object
};

DragHandle.defaultProps = {};

exports.default = DragHandle;