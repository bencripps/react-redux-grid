'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setSelection = exports.deselectAll = exports.selectAll = exports.deselectRow = exports.selectRow = undefined;

var _ActionTypes = require('../../../constants/ActionTypes');

var selectRow = exports.selectRow = function selectRow(_ref) {
    var stateKey = _ref.stateKey,
        rowId = _ref.rowId;
    return {
        type: _ActionTypes.SELECT_ROW,
        stateKey: stateKey,
        rowId: rowId
    };
};

var deselectRow = exports.deselectRow = function deselectRow(_ref2) {
    var stateKey = _ref2.stateKey,
        rowId = _ref2.rowId;
    return {
        type: _ActionTypes.DESELECT_ROW,
        stateKey: stateKey,
        rowId: rowId
    };
};

var selectAll = exports.selectAll = function selectAll(_ref3) {
    var data = _ref3.data,
        stateKey = _ref3.stateKey;


    if (!data) {
        return {};
    }

    var keys = data.currentRecords.map(function (row) {
        return row._key;
    });

    var selection = keys.reduce(function (obj, k) {
        obj[k] = true;
        return obj;
    }, {});

    return { type: _ActionTypes.SELECT_ALL, selection: selection, stateKey: stateKey };
};

var deselectAll = exports.deselectAll = function deselectAll(_ref4) {
    var stateKey = _ref4.stateKey;
    return {
        type: _ActionTypes.DESELECT_ALL, stateKey: stateKey
    };
};

var setSelection = exports.setSelection = function setSelection(_ref5) {
    var id = _ref5.id,
        _ref5$defaults = _ref5.defaults,
        defaults = _ref5$defaults === undefined ? {} : _ref5$defaults,
        _ref5$modes = _ref5.modes,
        modes = _ref5$modes === undefined ? {} : _ref5$modes,
        stateKey = _ref5.stateKey,
        index = _ref5.index;


    var allowDeselect = defaults.allowDeselect;
    var clearSelections = defaults.mode === modes.checkboxSingle || defaults.mode === modes.single;

    if (!defaults.enabled) {
        /* eslint-disable no-console */
        console.warn('Selection model has been disabled');
        /* eslint-enable no-console */
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
};