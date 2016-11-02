'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fire = exports.fire = function fire(name, events, scope) {
    for (var _len = arguments.length, args = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
    }

    return events && name && typeof events[name] === 'function' ? events[name].apply(scope, args) : undefined;
};