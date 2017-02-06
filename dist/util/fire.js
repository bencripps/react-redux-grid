'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fireEvent = exports.fireEvent = function fireEvent(name, events) {
    var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var browserEvent = arguments[3];


    if (!events || typeof events[name] !== 'function') {
        return;
    }

    var dynamicArgs = Object.keys(context).reduce(function (prev, k) {
        prev[k] = normalize(context[k]);
        return prev;
    }, {});

    // apply dynamic arguments
    // but these vals will always be represented
    return events[name](Object.assign({}, dynamicArgs, {
        editor: normalize(context.editor),
        events: events,
        isSelected: context.isSelected,
        row: normalize(context.row),
        rowId: context.rowId,
        rowIndex: context.rowIndex
    }), browserEvent);
};

var normalize = exports.normalize = function normalize(v) {
    return v && v.toJS ? v.toJS() : v;
};