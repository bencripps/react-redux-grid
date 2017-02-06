'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.prefix = undefined;

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

var _GridConstants = require('../constants/GridConstants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefix = exports.prefix = function prefix() {
    for (var _len = arguments.length, classes = Array(_len), _key = 0; _key < _len; _key++) {
        classes[_key] = arguments[_key];
    }

    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CSS_PREFIX = _gridConfig.CSS_PREFIX;

    var DELIMITER = CSS_PREFIX ? '-' : '';

    return (0, _arrayFrom2.default)(classes).map(function (cls) {

        if (!cls || cls.length === 0) {
            return null;
        }

        return '' + CSS_PREFIX + DELIMITER + cls;
    }).filter(function (cls) {
        return cls;
    }).join(' ');
};