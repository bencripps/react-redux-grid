'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _ActionTypes = require('./../../../constants/ActionTypes');

var _handleActions2 = require('./../../../util/handleActions');

var _handleActions3 = _interopRequireDefault(_handleActions2);

var _lastUpdate = require('./../../../util/lastUpdate');

var _bulkaction = require('./../../actionHelpers/plugins/bulkaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = (0, _immutable.fromJS)({ lastUpdate: (0, _lastUpdate.generateLastUpdate)() });

exports.default = (0, _handleActions3.default)(_defineProperty({}, _ActionTypes.REMOVE_TOOLBAR, _bulkaction.removeToolbar), initialState);