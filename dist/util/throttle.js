"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
function throttle(callback, scope, limit) {
    var wait = false;

    limit = limit || 100;

    return function dothrottle() {
        if (!wait) {
            callback.apply(scope, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    debugger;
    var timeout = void 0;

    return function doDebounce() {
        var context = this;
        var args = arguments;

        var later = function later() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        var callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}
