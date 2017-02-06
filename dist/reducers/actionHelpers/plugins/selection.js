'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setIndexes = exports.setSelection = exports.deselectRow = exports.selectRow = exports.removeSelections = exports.deselectAll = exports.selectAll = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _records = require('./../../../records');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectAll = exports.selectAll = function selectAll(state, _ref) {
    var selection = _ref.selection,
        stateKey = _ref.stateKey;
    return state.setIn([stateKey], new _records.Selection(Object.assign({}, selection, {
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    })));
};

var deselectAll = exports.deselectAll = function deselectAll(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return state.setIn([stateKey], new _records.Selection({
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var removeSelections = exports.removeSelections = function removeSelections(state, _ref3) {
    var stateKey = _ref3.stateKey;
    return state.setIn([stateKey], new _records.Selection({
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var selectRow = exports.selectRow = function selectRow(state, _ref4) {
    var _ref5;

    var rowId = _ref4.rowId,
        stateKey = _ref4.stateKey;
    return state.mergeIn([stateKey], new _records.Selection((_ref5 = {}, _defineProperty(_ref5, rowId, true), _defineProperty(_ref5, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref5)));
};

var deselectRow = exports.deselectRow = function deselectRow(state, _ref6) {
    var _ref7;

    var rowId = _ref6.rowId,
        stateKey = _ref6.stateKey;
    return state.mergeIn([stateKey], new _records.Selection((_ref7 = {}, _defineProperty(_ref7, rowId, false), _defineProperty(_ref7, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref7)));
};

var setSelection = exports.setSelection = function setSelection(state, _ref8) {
    var _ref10;

    var allowDeselect = _ref8.allowDeselect,
        clearSelections = _ref8.clearSelections,
        id = _ref8.id,
        index = _ref8.index,
        stateKey = _ref8.stateKey;

    var currentValue = state.getIn([stateKey, id]);
    var currentIndexes = state.getIn([stateKey, 'indexes']);
    var isSelectAction = allowDeselect ? !currentValue : true;
    var indexes = setIndexes(index, currentIndexes && currentIndexes.toJS ? currentIndexes.toJS() : currentIndexes, !isSelectAction);

    if (clearSelections || !state.get(stateKey)) {
        var _ref9;

        return state.setIn([stateKey], new _records.Selection((_ref9 = {}, _defineProperty(_ref9, id, isSelectAction), _defineProperty(_ref9, 'indexes', isSelectAction ? [index] : []), _defineProperty(_ref9, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref9)));
    }

    // multiselect
    return state.mergeIn([stateKey], new _records.Selection((_ref10 = {}, _defineProperty(_ref10, id, isSelectAction), _defineProperty(_ref10, 'indexes', indexes), _defineProperty(_ref10, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _ref10)));
};

var setIndexes = exports.setIndexes = function setIndexes(ids) {
    var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var isRemove = arguments[2];


    if (!isRemove) {
        if (Array.isArray(ids)) {

            ids.forEach(function (id) {
                if (previous.indexOf(id) === -1) {
                    previous.push(id);
                }
            });
        } else {

            if (previous.indexOf(ids) !== -1) {
                return previous;
            }

            previous.push(ids);
            return previous;
        }
    } else if (isRemove) {
        var _ret = function () {
            var idx = void 0;
            if (Array.isArray(ids)) {

                ids.forEach(function (id) {
                    idx = previous.indexOf(id);
                    if (idx !== -1) {
                        previous.splice(idx, 1);
                    }
                });
            } else {
                idx = previous.indexOf(ids);

                if (idx !== -1) {
                    previous.splice(idx, 1);
                    return {
                        v: previous
                    };
                }

                return {
                    v: previous
                };
            }
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return previous;
};