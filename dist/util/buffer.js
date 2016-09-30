'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bufferBottom = exports.bufferTop = undefined;

var _GridConstants = require('./../constants/GridConstants');

var bufferTop = exports.bufferTop = function bufferTop(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount) {
    var spacerCount = Math.max(viewableIndex - viewableCount * bufferMultiplier, 0);

    // spacerCount can never be greater than (
    // totalCount - viewableCount * rowHeight)
    return Math.min(spacerCount * rowHeight, totalCount - viewableCount * rowHeight);
};

var bufferBottom = exports.bufferBottom = function bufferBottom(rowHeight, viewableIndex, viewableCount, bufferMultiplier, totalCount) {
    var spacerCount = Math.max(totalCount - viewableIndex - viewableCount * (bufferMultiplier + 1), 0);

    return spacerCount * rowHeight;
};