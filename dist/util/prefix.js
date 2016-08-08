'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prefix = prefix;

var _GridConstants = require('../constants/GridConstants');

function prefix() {
    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    return Array.from(classes).map(function (cls) {

        if (!cls || cls.length === 0) {
            return null;
        }

        return _GridConstants.CSS_PREFIX + '-' + cls;
    }).filter(function (cls) {
        return cls;
    }).join(' ');
}