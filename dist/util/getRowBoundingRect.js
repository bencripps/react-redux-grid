'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getRowBoundingRect = exports.getRowBoundingRect = function getRowBoundingRect(row) {
    var container = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];


    if (!container) {
        container = row && row.offsetParent ? row.offsetParent.offsetParent : null;
    }

    if (!container) {
        return {};
    }

    var rowBCR = row.getBoundingClientRect();
    var containerBCR = container.getBoundingClientRect();

    var spaceBottom = containerBCR.bottom - rowBCR.bottom;
    var spaceTop = rowBCR.top - containerBCR.top;

    var maxHeight = Math.max(spaceBottom, spaceTop);
    var position = spaceTop > spaceBottom ? 'top' : 'bottom';

    return {
        maxHeight: maxHeight,
        position: position,
        spaceTop: spaceTop,
        spaceBottom: spaceBottom
    };
};