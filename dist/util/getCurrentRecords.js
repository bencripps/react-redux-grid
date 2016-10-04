'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentRecords = undefined;

var _GridConstants = require('./../constants/GridConstants');

var getCurrentRecords = exports.getCurrentRecords = function getCurrentRecords(dataSource, pageIndex, pageSize, infinite, viewableIndex, viewableCount, bufferMultiplier) {

    if (!dataSource) {
        return {};
    }

    if (infinite) {
        var start = Math.max(viewableIndex - viewableCount * bufferMultiplier, 0);

        var end = Math.min(viewableIndex + viewableCount * (bufferMultiplier + 1), dataSource.currentRecords.length);

        return {
            data: dataSource.data.slice(start, end),
            startIndex: start,
            endIndex: end
        };
    }

    return {
        data: dataSource.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
        startIndex: null,
        endIndex: null
    };
};