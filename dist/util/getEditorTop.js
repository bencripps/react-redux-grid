"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var OFFSET = exports.OFFSET = 7;

var getEditorTop = exports.getEditorTop = function getEditorTop(rowElement) {

    if (!rowElement) {
        return null;
    }

    return rowElement.offsetTop + rowElement.clientHeight + OFFSET;
};