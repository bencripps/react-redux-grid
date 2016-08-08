"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FilterUtils = function () {
    function FilterUtils() {
        _classCallCheck(this, FilterUtils);
    }

    _createClass(FilterUtils, [{
        key: "byKeyword",
        value: function byKeyword(value, datasource) {
            return datasource.proxy.filter(function (obj) {

                var keys = Object.keys(obj);

                for (var i = 0; i < keys.length; i++) {
                    if (obj[keys[i]].toLowerCase().indexOf(value) !== -1) {
                        return true;
                    }
                }

                return false;
            });
        }
    }, {
        key: "byMenu",
        value: function byMenu(filterObj, datasource) {

            if (!filterObj) {
                return datasource.proxy;
            }

            return datasource.proxy.filter(function (obj) {

                var keys = Object.keys(obj);

                for (var i = 0; i < keys.length; i++) {

                    var key = keys[i].toLowerCase();
                    var value = filterObj[key] ? filterObj[key].toLowerCase() : null;

                    if (filterObj[key]) {
                        if (obj[keys[i]].toLowerCase().indexOf(value) === -1) {

                            return false;
                        }
                    }
                }

                return true;
            });
        }
    }]);

    return FilterUtils;
}();

exports.default = new FilterUtils();