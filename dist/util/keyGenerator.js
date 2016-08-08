'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.keyGenerator = keyGenerator;
exports.keyFromObject = keyFromObject;
function keyGenerator() {
    for (var _len = arguments.length, keywords = Array(_len), _key = 0; _key < _len; _key++) {
        keywords[_key] = arguments[_key];
    }

    return btoa(Array.from(keywords).join(''));
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