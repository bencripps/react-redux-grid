'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleActions;

var _immutable = require('immutable');

var _ActionTypes = require('../../../constants/ActionTypes');

var _selection = require('./../../actionHelpers/plugins/selection');

var _handleActions2 = require('./../../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _lastUpdate = require('./../../../util/lastUpdate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

exports.default = (0, _handleActions3.default)((_handleActions = {}, _defineProperty(_handleActions, _ActionTypes.SET_SELECTION, _selection.setSelection), _defineProperty(_handleActions, _ActionTypes.SELECT_ALL, _selection.selectAll), _defineProperty(_handleActions, _ActionTypes.DESELECT_ALL, _selection.deselectAll), _defineProperty(_handleActions, _ActionTypes.SET_DATA, _selection.removeSelections), _defineProperty(_handleActions, _ActionTypes.SELECT_ROW, _selection.selectRow), _defineProperty(_handleActions, _ActionTypes.DESELECT_ROW, _selection.deselectRow), _handleActions), initialState);