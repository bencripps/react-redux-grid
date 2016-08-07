'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Inline = require('./Inline');

var _Inline2 = _interopRequireDefault(_Inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Manager = function () {
    function Manager() {
        _classCallCheck(this, Manager);
    }

    _createClass(Manager, [{
        key: 'init',
        value: function init(plugins, stateKey, store) {

            var defaults = {
                type: 'inline',
                enabled: false,
                focusOnEdit: true
            };

            var editModes = {
                inline: 'inline'
            };

            var config = plugins && plugins.EDITOR ? Object.assign(defaults, plugins.EDITOR) : defaults;

            this.stateKey = stateKey;
            this.config = config;
            this.editModes = editModes;
            this.store = store;
        }
    }, {
        key: 'getComponent',
        value: function getComponent(plugins, reducerKeys, store, events, selectionModel, editor, columns) {

            var editorProps = {
                columns: columns,
                config: this.config,
                reducerKeys: reducerKeys,
                store: store,
                stateKey: this.stateKey,
                events: events
            };

            if (!this.config.enabled) {
                return null;
            } else if (this.config.type === this.editModes.inline) {
                return _react2.default.createElement(_Inline2.default, editorProps);
            }

            return null;
        }
    }]);

    return Manager;
}();

exports.default = Manager;