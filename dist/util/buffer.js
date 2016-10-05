"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bufferTop = exports.bufferTop = function bufferTop(rowHeight, viewableIndex, viewableCount, bufferMultiplier) {
    var spacerCount = Math.max(viewableIndex - viewableCount * bufferMultiplier, 0);

    return spacerCount * rowHeight;
};

var bufferBottom = exports.bufferBottom = function bufferBottom(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount) {
    var spacerCount = Math.max(totalCount - viewableIndex - viewableCount * (bufferMultiplier + 1), 0);

    return spacerCount * rowHeight;
};