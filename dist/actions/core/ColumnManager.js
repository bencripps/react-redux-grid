'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reorderColumn = undefined;

var _ActionTypes = require('../../constants/ActionTypes');

var reorderColumn = exports.reorderColumn = function reorderColumn(_ref) {
    var draggedIndex = _ref.draggedIndex,
        droppedIndex = _ref.droppedIndex,
        columns = _ref.columns,
        stateKey = _ref.stateKey,
        stateful = _ref.stateful;


    var reorder = function reorder(cols, to, from) {
        cols.splice(to, 0, cols.splice(from, 1)[0]);
        return cols;
    };

    var reorderedColumns = reorder(columns, droppedIndex, draggedIndex);

    return {
        type: _ActionTypes.SET_COLUMNS,
        columns: reorderedColumns,
        stateKey: stateKey,
        stateful: stateful
    };
};