'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

exports.keyGenerator = keyGenerator;
exports.keyFromObject = keyFromObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function keyGenerator() {
    for (var _len = arguments.length, keywords = Array(_len), _key = 0; _key < _len; _key++) {
        keywords[_key] = arguments[_key];
    }

    return btoa(unescape(encodeURIComponent((0, _arrayFrom2.default)(keywords).join(''))));
}

function keyFromObject(obj, additionalStrings) {

    if (additionalStrings && Array.isArray(additionalStrings)) {
        return btoa(additionalStrings.join('') + Object.keys(obj).map(function (k) {
            return obj[k];
        }).join(''));
    }

    return btoa(Object.keys(obj).map(function (k) {
        return obj[k];
    }).join(''));
}