'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.selectAll = selectAll;
exports.deselectAll = deselectAll;
exports.setSelection = setSelection;

var _ActionTypes = require('../../../constants/ActionTypes');

function selectAll(_ref) {
    var data = _ref.data;
    var stateKey = _ref.stateKey;


    if (!data) {
        return {};
    }

    var keys = data.currentRecords.map(function (row, i) {
        return row._key;
    });

    var selection = keys.reduce(function (obj, k) {
        obj[k] = true;
        return obj;
    }, {});

    return { type: _ActionTypes.SELECT_ALL, selection: selection, stateKey: stateKey };
}

function deselectAll(_ref2) {
    var stateKey = _ref2.stateKey;

    return { type: _ActionTypes.DESELECT_ALL, stateKey: stateKey };
}

function setSelection(_ref3) {
    var id = _ref3.id;
    var _ref3$defaults = _ref3.defaults;
    var defaults = _ref3$defaults === undefined ? {} : _ref3$defaults;
    var _ref3$modes = _ref3.modes;
    var modes = _ref3$modes === undefined ? {} : _ref3$modes;
    var stateKey = _ref3.stateKey;
    var index = _ref3.index;


    var allowDeselect = defaults.allowDeselect;
    var clearSelections = defaults.mode === modes.checkboxSingle || defaults.mode === modes.single;

    if (!defaults.enabled) {
        console.warn('Selection model has been disabled');
        return { type: _ActionTypes.NO_EVENT };
    }

    if (defaults.mode === modes.single) {
        return {
            type: _ActionTypes.SET_SELECTION,
            id: id,
            clearSelections: clearSelections,
            allowDeselect: allowDeselect,
            index: index,
            stateKey: stateKey
        };
    } else if (defaults.mode === modes.multi) {
        return { type: _ActionTypes.SET_SELECTION, id: id, allowDeselect: allowDeselect, index: index, stateKey: stateKey };
    } else if (defaults.mode === modes.checkboxSingle || defaults.mode === modes.checkboxMulti) {
        return {
            type: _ActionTypes.SET_SELECTION,
            id: id,
            clearSelections: clearSelections,
            allowDeselect: allowDeselect,
            index: index,
            stateKey: stateKey
        };
    }
}