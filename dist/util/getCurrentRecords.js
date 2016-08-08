"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getCurrentRecords = exports.getCurrentRecords = function getCurrentRecords(dataSource, pageIndex, pageSize) {
    if (!dataSource) {
        return null;
    }

    var selectedRows = dataSource.data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

    return selectedRows;
};