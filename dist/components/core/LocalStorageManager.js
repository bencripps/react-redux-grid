'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LocalStorageManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttle = require('./../../util/throttle');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocalStorageManager = exports.LocalStorageManager = function () {
    function LocalStorageManager() {
        _classCallCheck(this, LocalStorageManager);
    }

    _createClass(LocalStorageManager, [{
        key: 'setStateItem',
        value: function setStateItem(_ref) {
            var stateKey = _ref.stateKey;
            var property = _ref.property;
            var value = _ref.value;


            var json = JSON.stringify(value);

            window.localStorage.setItem(this.getKey({ stateKey: stateKey, property: property }), json);
        }
    }, {
        key: 'debouncedSetStateItem',
        value: function debouncedSetStateItem() {
            return (0, _throttle.debounce)(this.setStateItem.bind(this), 500, false);
        }
    }, {
        key: 'getStateItem',
        value: function getStateItem(_ref2) {
            var stateKey = _ref2.stateKey;
            var property = _ref2.property;
            var value = _ref2.value;
            var _ref2$shouldSave = _ref2.shouldSave;
            var shouldSave = _ref2$shouldSave === undefined ? true : _ref2$shouldSave;


            var item = window.localStorage.getItem(this.getKey({ stateKey: stateKey, property: property }));

            if (item) {
                return JSON.parse(item);
            }

            if (value && shouldSave) {
                this.setStateItem({ stateKey: stateKey, property: property, value: value });
            }

            return value;
        }
    }, {
        key: 'getKey',
        value: function getKey(_ref3) {
            var stateKey = _ref3.stateKey;
            var property = _ref3.property;


            if (!stateKey || !property) {
                throw new Error('stateKey and property are required params');
            }

            return 'react-grid-' + stateKey + '-' + property;
        }
    }]);

    return LocalStorageManager;
}();

exports.default = new LocalStorageManager();