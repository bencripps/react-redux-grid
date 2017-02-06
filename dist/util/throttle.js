"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
function throttle(callback, scope) {
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


    options = Object.assign({
        leading: true,
        trailing: false
    }, options);

    var wait = false;
    var skip = false;

    if (options.leading === false) {
        skip = true;
    }

    var later = debounce(function dodebounce() {
        if (options.trailing) {
            callback.apply(scope, arguments);
        }
        if (options.leading === false) {
            skip = true;
        }
    }, limit + limit * 0.15);

    return function dothrottle() {
        var _arguments = arguments;


        if (!wait && !skip) {
            callback.apply(scope, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
                if (later) {
                    later.apply(scope, _arguments);
                }
            }, limit);
        } else if (!wait && skip) {
            wait = true;
            setTimeout(function () {
                skip = false;
                wait = false;
                if (later) {
                    later.apply(scope, _arguments);
                }
            }, limit);
        }
    };
}

function debounce(func, wait, immediate) {
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