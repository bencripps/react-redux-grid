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
    var actualIndex = _ref.actualIndex,
        col = _ref.col,
        columnManager = _ref.columnManager,
        dragAndDropManager = _ref.dragAndDropManager,
        sortHandle = _ref.sortHandle;

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var innerHTML = col.name;
    var draggable = col.moveable !== undefined ? col.moveable : columnManager.config.moveable;

    var spanProps = dragAndDropManager.initDragable({
        draggable: draggable,
        className: draggable ? (0, _prefix.prefix)(CLASS_NAMES.DRAGGABLE_COLUMN, CLASS_NAMES.COLUMN) : (0, _prefix.prefix)(CLASS_NAMES.COLUMN),
        onDrag: function onDrag() {},
        onDragStart: function onDragStart(reactEvent) {
            var data = {
                key: (0, _keyGenerator.keyFromObject)(col),
                index: actualIndex
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
    actualIndex: _react.PropTypes.number,
    col: _react.PropTypes.object,
    columnManager: _react.PropTypes.object,
    dragAndDropManager: _react.PropTypes.object,
    index: _react.PropTypes.number,
    sortHandle: _react.PropTypes.element
};