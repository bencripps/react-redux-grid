"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var val = 0;

var getNewRowId = exports.getNewRowId = function getNewRowId() {
    return --val;
};

var resetRowId = exports.resetRowId = function resetRowId() {
    val = 0;
};