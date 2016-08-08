'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.closestRow = exports.handleEditClick = undefined;

var _EditorActions = require('./../actions/plugins/editor/EditorActions');

var handleEditClick = exports.handleEditClick = function handleEditClick(editor, store, rowId, rowData, rowIndex, columns, stateKey, data) {
    var row = closestRow(data.reactEvent.target);
    var offset = 7;
    var top = row ? row.offsetTop + row.clientHeight + offset : 0;

    if (editor.config.type === editor.editModes.inline) {
        store.dispatch((0, _EditorActions.editRow)({
            rowId: rowId, top: top, rowData: rowData, rowIndex: rowIndex, columns: columns, stateKey: stateKey
        }));
    }
};

var closestRow = exports.closestRow = function closestRow(target) {
    var el = target;

    while (el && el !== document.body) {
        if (el && el.classList && el.classList.contains('react-grid-row')) {
            return el;
        }
        el = el.parentNode;
    }
};