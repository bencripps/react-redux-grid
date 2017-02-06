'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var camelize = exports.camelize = function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
};