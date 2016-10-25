'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setIndexes = exports.setSelection = exports.deselectRow = exports.selectRow = exports.removeSelections = exports.deselectAll = exports.selectAll = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _lastUpdate = require('./../../../util/lastUpdate');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var selectAll = exports.selectAll = function selectAll(state, _ref) {
    var selection = _ref.selection;
    var stateKey = _ref.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)(_extends({}, selection, {
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    })));
};

var deselectAll = exports.deselectAll = function deselectAll(state, _ref2) {
    var stateKey = _ref2.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var removeSelections = exports.removeSelections = function removeSelections(state, _ref3) {
    var stateKey = _ref3.stateKey;
    return state.setIn([stateKey], (0, _immutable.fromJS)({
        lastUpdate: (0, _lastUpdate.generateLastUpdate)()
    }));
};

var selectRow = exports.selectRow = function selectRow(state, _ref4) {
    var _fromJS;

    var rowId = _ref4.rowId;
    var stateKey = _ref4.stateKey;
    return state.mergeIn([stateKey], (0, _immutable.fromJS)((_fromJS = {}, _defineProperty(_fromJS, rowId, true), _defineProperty(_fromJS, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS)));
};

var deselectRow = exports.deselectRow = function deselectRow(state, _ref5) {
    var _fromJS2;

    var rowId = _ref5.rowId;
    var stateKey = _ref5.stateKey;
    return state.mergeIn([stateKey], (0, _immutable.fromJS)((_fromJS2 = {}, _defineProperty(_fromJS2, rowId, false), _defineProperty(_fromJS2, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS2)));
};

var setSelection = exports.setSelection = function setSelection(state, _ref6) {
    var _fromJS4;

    var allowDeselect = _ref6.allowDeselect;
    var clearSelections = _ref6.clearSelections;
    var id = _ref6.id;
    var index = _ref6.index;
    var stateKey = _ref6.stateKey;

    var currentValue = state.getIn([stateKey, id]);
    var currentIndexes = state.getIn([stateKey, 'indexes']);
    var isSelectAction = allowDeselect ? !currentValue : true;
    var indexes = setIndexes(index, currentIndexes && currentIndexes.toJS ? currentIndexes.toJS() : currentIndexes, !isSelectAction);

    if (clearSelections || !state.get(stateKey)) {
        var _fromJS3;

        return state.setIn([stateKey], (0, _immutable.fromJS)((_fromJS3 = {}, _defineProperty(_fromJS3, id, isSelectAction), _defineProperty(_fromJS3, 'indexes', isSelectAction ? [index] : []), _defineProperty(_fromJS3, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS3)));
    }

    // multiselect
    return state.mergeIn([stateKey], (0, _immutable.fromJS)((_fromJS4 = {}, _defineProperty(_fromJS4, id, isSelectAction), _defineProperty(_fromJS4, 'indexes', indexes), _defineProperty(_fromJS4, 'lastUpdate', (0, _lastUpdate.generateLastUpdate)()), _fromJS4)));
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