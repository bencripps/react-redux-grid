'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ModelActions = require('../../../actions/plugins/selection/ModelActions');

var _CheckBox = require('./CheckBox');

var _GridConstants = require('./../../../constants/GridConstants');

var _fire = require('./../../../util/fire');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    _createClass(Model, [{
        key: 'init',
        value: function init(plugins, stateKey, store, events) {

            var eventTypes = {
                singleclick: 'singleclick',
                doubleclick: 'doubleclick'
            };

            var modes = _GridConstants.SELECTION_MODES;

            var defaults = {
                mode: modes.single,
                enabled: true,
                editEvent: 'none',
                allowDeselect: true,
                activeCls: 'active',
                editCls: 'edit',
                selectionEvent: eventTypes.singleclick,
                store: store
            };

            var config = plugins && plugins.SELECTION_MODEL ? Object.assign(defaults, plugins.SELECTION_MODEL) : defaults;

            this.defaults = config;
            this.eventTypes = eventTypes;
            this.modes = modes;
            this.store = config.store;
            this.stateKey = stateKey;
            this.events = events;
        }
    }, {
        key: 'handleSelectionEvent',
        value: function handleSelectionEvent(selectionEvent) {

            (0, _fire.fireEvent)('HANDLE_BEFORE_SELECTION', this.events, Object.assign({}, selectionEvent), null);

            (0, _fire.fireEvent)('HANDLE_BEFORE_BULKACTION_SHOW', this.events, Object.assign({}, selectionEvent), null);

            this.store.dispatch((0, _ModelActions.setSelection)({
                id: selectionEvent.id,
                index: selectionEvent.index,
                defaults: this.defaults,
                modes: this.modes,
                stateKey: this.stateKey
            }));

            (0, _fire.fireEvent)('HANDLE_AFTER_SELECTION', this.events, Object.assign({}, selectionEvent), null);

            (0, _fire.fireEvent)('HANDLE_AFTER_BULKACTION_SHOW', this.events, Object.assign({}, selectionEvent), null);
        }
    }, {
        key: 'updateCells',
        value: function updateCells(_ref) {
            var cells = _ref.cells,
                rowId = _ref.rowId,
                index = _ref.index,
                type = _ref.type,
                reducerKeys = _ref.reducerKeys,
                stateKey = _ref.stateKey,
                rowData = _ref.rowData,
                isSelected = _ref.isSelected;


            var cellsUpdate = cells;

            var checkBoxProps = {
                key: rowId,
                rowId: rowId,
                type: type,
                reducerKeys: reducerKeys,
                stateKey: stateKey,
                store: this.store,
                index: index,
                rowData: rowData,
                onSelect: this.handleSelectionEvent.bind(this),
                selectionModelConfig: this.defaults,
                events: this.events,
                isSelected: isSelected
            };

            if (this.defaults.mode === this.modes.checkboxSingle || this.defaults.mode === this.modes.checkboxMulti) {
                cellsUpdate.unshift(_react2.default.createElement(_CheckBox.ConnectedCheckBox, checkBoxProps));
            }

            return cellsUpdate;
        }
    }]);

    return Model;
}();

exports.default = Model;