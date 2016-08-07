'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sorter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GridConstants = require('../constants/GridConstants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sorter = exports.Sorter = function () {
    function Sorter() {
        _classCallCheck(this, Sorter);
    }

    _createClass(Sorter, [{
        key: 'sortBy',
        value: function sortBy(name, direction, datasource) {
            return datasource.data.sort(function (a, b) {

                if (a[name] < b[name] && direction) {
                    return direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? 1 : -1;
                } else if (a[name] > b[name]) {
                    return direction === _GridConstants.SORT_DIRECTIONS.ASCEND ? -1 : 1;
                }
            });
        }
    }]);

    return Sorter;
}();

exports.default = new Sorter();