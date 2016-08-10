'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

exports.prefix = prefix;

var _GridConstants = require('../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefix() {
    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    return (0, _arrayFrom2.default)(classes).map(function (cls) {

        if (!cls || cls.length === 0) {
            return null;
        }

        return _GridConstants.CSS_PREFIX + '-' + cls;
    }).filter(function (cls) {
        return cls;
    }).join(' ');
}