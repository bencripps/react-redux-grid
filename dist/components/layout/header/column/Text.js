'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Text = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _prefix = require('./../../../../util/prefix');

var _keyGenerator = require('./../../../../util/keyGenerator');

var _GridConstants = require('./../../../../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Text = exports.Text = function Text(_ref) {
    var col = _ref.col;
    var index = _ref.index;
    var columnManager = _ref.columnManager;
    var dragAndDropManager = _ref.dragAndDropManager;
    var sortHandle = _ref.sortHandle;


    var innerHTML = col.name;
    var draggable = col.moveable !== undefined ? col.moveable : columnManager.config.moveable;

    var spanProps = dragAndDropManager.initDragable({
        draggable: draggable,
        className: draggable ? (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.DRAGGABLE_COLUMN, _GridConstants.CLASS_NAMES.COLUMN) : (0, _prefix.prefix)(_GridConstants.CLASS_NAMES.COLUMN),
        onDrag: function onDrag(reactEvent) {},
        onDragStart: function onDragStart(reactEvent) {
            var data = {
                key: (0, _keyGenerator.keyFromObject)(col),
                index: index
            };
            reactEvent.dataTransfer.setData('Text', JSON.stringify(data));
        }
    });

    return _react2.default.createElement(
        'span',
        spanProps,
        innerHTML,
        sortHandle
    );
};

Text.propTypes = {
    col: _react.PropTypes.object,
    columnManager: _react.PropTypes.object,
    dragAndDropManager: _react.PropTypes.object,
    index: _react.PropTypes.number,
    sortHandle: _react.PropTypes.element
};