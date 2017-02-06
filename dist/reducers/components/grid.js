'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handleActions;

var _immutable = require('immutable');

var _ActionTypes = require('./../../constants/ActionTypes');

var _handleActions2 = require('./../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _grid = require('./../actionHelpers/grid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = new _immutable.OrderedMap();

exports.default = (0, _handleActions3.default)((_handleActions = {}, _defineProperty(_handleActions, _ActionTypes.SET_COLUMNS, _grid.setColumns), _defineProperty(_handleActions, _ActionTypes.RESIZE_COLUMNS, _grid.resizeColumns), _defineProperty(_handleActions, _ActionTypes.SET_SORT_DIRECTION, _grid.setSortDirection), _defineProperty(_handleActions, _ActionTypes.HIDE_HEADER, _grid.hideHeader), _handleActions), initialState);