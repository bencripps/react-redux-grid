'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DragHandle = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DragHandle = exports.DragHandle = function DragHandle(_ref) {
    var dragAndDropManager = _ref.dragAndDropManager,
        handleDrag = _ref.handleDrag;
    return _react2.default.createElement('span', Object.assign({
        draggable: true
    }, dragAndDropManager.initDragable({
        onDrag: handleDrag,
        draggable: true
    })));
};

var object = _react.PropTypes.object,
    func = _react.PropTypes.func;


DragHandle.propTypes = {
    col: object,
    dragAndDropManager: object,
    handleDrag: func
};