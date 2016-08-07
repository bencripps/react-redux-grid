'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragHandle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = exports.DragHandle = function DragHandle(_ref) {
    var col = _ref.col;
    var dragAndDropManager = _ref.dragAndDropManager;
    var handleDrag = _ref.handleDrag;


    var handleProps = dragAndDropManager.initDragable({
        onDrag: handleDrag,
        draggable: true
    });

    return _react2.default.createElement('span', handleProps);
};

DragHandle.propTypes = {
    col: _react.PropTypes.object,
    dragAndDropManager: _react.PropTypes.object
};