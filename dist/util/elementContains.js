'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.elementContains = elementContains;
function elementContains(el) {
    for (var _len = arguments.length, classes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classes[_key - 1] = arguments[_key];
    }

    if (!el || !classes || !classes.length) {
        throw Error('Function requires a dom node and a classname');
    }

    while (el && el !== document.body) {
        if (el && el.classList) {
            for (var i = 0; i < classes.length; i++) {
                if (el.classList.contains(classes[i])) {
                    return true;
                }
            }
        }
        el = el.parentNode;
    }
}